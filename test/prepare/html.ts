
import * as path from 'path';
import pug from 'pug';

const fn = pug.compileFile(path.join(__dirname, 'demo.pug'));

export default fn();
