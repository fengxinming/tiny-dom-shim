import { nothtmlwhiteRE, whitespaceRE } from './_reg';

function classToArray(className: string): string[] | null {
  return className.match(nothtmlwhiteRE);
}

function validateToken(token: string, method: string): void {
  if (token === '') {
    throw new Error(`Failed to execute '${method}' on 'DOMTokenList': The token provided must not be empty.`);
  }

  if (whitespaceRE.test(token)) {
    // eslint-disable-next-line max-len
    throw new Error(`Failed to execute '${method}' on 'DOMTokenList': The token provided ('${token}') contains HTML space characters, which are not valid in tokens.`);
  }
}

function addClass(elem: Element, tokens: string[]) {
  let curClasses: string[] = [];
  const { className } = elem;
  if (!className) {
    tokens.forEach((token) => {
      validateToken(token, 'add');
      curClasses.push(token);
    });
  }
  else {
    curClasses = classToArray(className) as string[];
    const num = curClasses.length;

    tokens.forEach((token) => {
      validateToken(token, 'add');
      const idx = curClasses.indexOf(token);
      if (idx === -1) {
        curClasses.push(token);
      }
    });

    if (num !== curClasses.length) {
      elem.className = curClasses.join(' ');
    }
  }
}

function removeClass(elem: Element, tokens: string[]) {
  const { className } = elem;
  if (!className) {
    return;
  }

  const curClasses = classToArray(className) as string[];
  const num = curClasses.length;

  tokens.forEach((token) => {
    validateToken(token, 'remove');
    const idx = curClasses.indexOf(token);
    if (idx !== -1) {
      curClasses.splice(idx, 1);
    }
  });

  if (num !== curClasses.length) {
    elem.className = curClasses.join(' ');
  }
}

function toggleClass(elem: Element, token: any, force: boolean): boolean {
  validateToken(token, 'toggle');

  if (force === void 0) {
    const curClasses = classToArray(elem.className);

    if (!curClasses) {
      elem.className = token;
      return true;
    }

    let ret = false;
    const idx = curClasses.indexOf(token);
    if (idx === -1) {
      curClasses.push(token);
      ret = true;
    }
    else {
      curClasses.splice(idx, 1);
    }
    elem.className = curClasses.join(' ');
    return ret;
  }
  else if (force) {
    addClass(elem, [token]);
    return true;
  }

  removeClass(elem, [token]);
  return false;

}

function replaceClass(elem: Element, oldToken: string, newToken: string): boolean {
  validateToken(oldToken, 'replace');
  validateToken(newToken, 'replace');
  const curClasses = classToArray(elem.className);
  if (!curClasses) {
    return false;
  }
  const idx = curClasses.indexOf(String(oldToken));
  if (idx === -1) {
    return false;
  }
  curClasses.splice(idx, 1, newToken);
  elem.className = curClasses.join(' ');
  return true;
}


export class DOMTokenList {
  private readonly el: Element;

  constructor(elem: Element) {
    this.el = elem;
  }

  get length(): number {
    const curClasses = classToArray(this.toString());
    if (!curClasses) {
      return 0;
    }
    return curClasses.length;
  }

  add(...tokens: string[]): void {
    const len = tokens.length;
    if (!len) {
      return;
    }

    addClass(this.el, tokens);
  }

  contains(token: string): boolean {
    const curClasses = classToArray(this.toString());
    if (!curClasses) {
      return false;
    }
    const idx = curClasses.indexOf(String(token));
    return idx !== -1;
  }

  item(index: number): string | null {
    const curClasses = classToArray(this.toString());
    if (!curClasses) {
      return null;
    }
    const len = curClasses.length;
    return curClasses[index ? index < 0 ? Math.max(0, len + index) : Math.min(index, len - 1) : 0];
  }

  remove(...tokens: string[]): void {
    const len = tokens.length;
    if (!len) {
      return;
    }

    removeClass(this.el, tokens);
  }

  toggle(token: string, force: boolean): boolean {
    return toggleClass(this.el, token, force);
  }

  replace(oldToken: string, newToken: string): boolean {
    return replaceClass(this.el, oldToken, newToken);
  }

  toString(): string {
    return this.el.className;
  }
}
