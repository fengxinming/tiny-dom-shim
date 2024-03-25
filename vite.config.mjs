import typescript from '@rollup/plugin-typescript';
import { globbySync } from 'globby';
import { build, defineConfig } from 'vite';
import cp from 'vite-plugin-cp';
import external from 'vite-plugin-external';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: globbySync(['src/*.ts', '!src/*.d.ts']),
      formats: ['es'],
      fileName: 'es/[name]'
    }
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
    external({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.dependencies)
    }),
    cp({
      targets: [
        {
          src: 'src/global.d.ts',
          dest: 'dist/types'
        }
      ]
    }),
    {
      name: 'build-cjs',
      closeBundle() {
        return build({
          configFile: false,
          build: {
            emptyOutDir: false,
            minify: false,
            lib: {
              entry: globbySync('dist/es/*.mjs'),
              formats: ['cjs'],
              fileName: '[name]'
            },
            rollupOptions: {
              output: {
                generatedCode: 'es5'
              }
            }
          },
          plugins: [
            external({
              nodeBuiltins: true,
              externalizeDeps: Object.keys(pkg.dependencies)
            })
          ]
        });
      }
    }
  ],
  test: {
    name: 'tiny-dom-shim',
    dir: './test',
    environment: 'jsdom'
  }
});
