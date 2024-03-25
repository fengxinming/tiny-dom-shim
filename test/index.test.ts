
import './prepare/precondition';
import '../src/index';

import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

import html from './prepare/html';

describe('测试 classList', () => {
  beforeAll(() => {
    document.body.innerHTML = html;
  });

  it('测试 classList.add', () => {
    const $div = document.querySelector('.test-after') as Element;
    const { classList } = $div;
    classList.add('class2');
    expect($div.className).toBe('test-after class2');

    classList.add('class1');
    expect($div.className).toBe('test-after class2 class1');

    classList.add('class3', 'class4');
    expect($div.className).toEqual(
      expect.stringMatching(/class3|class4/)
    );
  });

  it('测试 classList.remove', () => {
    const $div = document.querySelector('.test-remove-class') as Element;
    $div.classList.remove('class1', 'class2');
    expect($div.className).toBe('test-remove-class');
  });

  it('测试 classList.contains', () => {
    document.body.innerHTML = html;
    const $div = document.querySelector('.test-empty') as Element;

    expect($div.classList.contains('test-empty')).toBe(true);
    expect($div.classList.contains('test-after')).toBe(false);
  });

  it('测试 classList.toggle', () => {
    const $div = document.querySelector('.test-after2') as Element;
    $div.classList.toggle('class2');
    expect($div.className).toBe('test-after2 class2');

    $div.classList.toggle('class1');
    expect($div.className).toBe('test-after2 class2 class1');

    $div.classList.toggle('class2');
    expect($div.className).toBe('test-after2 class1');

    $div.classList.toggle('class1');
    expect($div.className).toBe('test-after2');

    $div.classList.toggle('class1', true);
    expect($div.className).toEqual(
      expect.stringMatching(/class1/)
    );

    $div.classList.toggle('class2', false);
    expect($div.className).toEqual(
      expect.stringMatching(/class1/)
    );
  });

  it('测试 classList.replace', () => {
    document.body.innerHTML = html;
    const $div = document.querySelector('.test-remove-class.class2.class1') as Element;

    expect($div.classList.replace('class2', 'class3')).toBe(true);
    expect($div.classList.replace('class', 'class4')).toBe(false);
    expect($div.className).toBe('test-remove-class class3 class1');
  });

});

describe('测试 dom 操作', () => {
  beforeEach(() => {
    document.body.innerHTML = html;
  });

  it('测试 after', () => {
    const $div = document.querySelector('.test-after') as Element;

    ($div.querySelector('.after') as Element).after('<div>123</div>');
    expect($div.textContent).toEqual(
      expect.stringContaining('<div>123</div>')
    );

    const dom = document.createElement('div');
    dom.innerHTML = '456';
    ($div.querySelector('.after') as Element).after(dom);
    expect($div.innerHTML).toEqual(
      expect.stringContaining('<div>456</div>')
    );
  });

  it('测试 append', () => {
    const $div = document.querySelector('.test-append') as Element;
    $div.append('<div>123</div>');
    expect($div.textContent).toBe('<div>123</div>');

    const range = document.createRange();
    $div.append(range.createContextualFragment('<div>456</div>'));
    expect($div.textContent).toBe('<div>123</div>456');
  });

  it('测试 before', () => {
    document.body.innerHTML = html;
    const $div = document.querySelector('.test-after') as Element;

    ($div.querySelector('.after') as Element).before('<div>123</div>');
    expect($div.textContent).toEqual(
      expect.stringContaining('<div>123</div>')
    );
  });

  it('测试 prepend', () => {
    const $div = document.querySelector('.test-append') as Element;
    $div.prepend('<div>123</div>');
    expect($div.textContent).toBe('<div>123</div>');
  });

  it('测试 remove', () => {
    const $div = document.querySelector('.test-after') as Element;
    ($div.querySelector('.after') as Element).remove();
    expect($div.innerHTML).toBe('<div class="after"></div>');
  });

  it('测试 replace', () => {
    const $div = document.querySelector('.test-after') as Element;
    ($div.querySelector('.after') as Element).replace('123');
    expect($div.innerHTML).toBe('123<div class="after"></div>');
  });
});
