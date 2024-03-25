import { DOMTokenList as DOMTokenListShim } from './_/DOMTokenList';

const testHTMLElement = document.createElement('x');
const testSVGElement = document.createElementNS('http://www.w3.org/2000/svg',
  'svg');

// https://caniuse.com/classlist
function isSupported(elem: Element) {
  return ('classList' in elem)
    ? (!elem.classList.toggle('a', false) && !elem.classList.contains('a'))
    : false;
}

// 在 IE 9-11 环境中支持 svg
if (!isSupported(testSVGElement)) {
  Object.defineProperty(Element.prototype, 'classList', {
    get: function () {
      let { _classList } = this;
      if (!_classList) {
        _classList = new DOMTokenListShim(this);
        this._classList = _classList;
      }
      return _classList;
    }
  });
}

// 在 IE 10-11, iOS 5, Android 4.3 环境中补全实现 add/remove/toggle
if (!isSupported(testHTMLElement)) {
  const DOMTokenListPrototype = DOMTokenList.prototype;
  const shimMethod = function (original: (token: string) => void) {
    return function (this: DOMTokenList, ...tokens: string[]): void {
      tokens.forEach((token) => {
        original.call(this, token);
      });
    };
  };

  DOMTokenListPrototype.add = shimMethod(DOMTokenListPrototype.add);
  DOMTokenListPrototype.remove = shimMethod(DOMTokenListPrototype.remove);
  DOMTokenListPrototype.toggle = function (token, force) {
    if (force === void 0) {
      if (this.contains(token)) {
        this.remove(token);
        return false;
      }
      this.add(token);
      return true;
    }

    if (force) {
      this.add(token);
      return true;
    }

    this.remove(token);
    return false;
  };
  if (!DOMTokenListPrototype.replace) {
    const argumentsRequired = function (num: number): Error {
      return new Error(`Failed to execute 'replace' on 'DOMTokenList': 2 arguments required, but only ${num} present.`);
    };
    DOMTokenListPrototype.replace = function (this: DOMTokenList, oldToken: string, newToken: string): boolean {
      switch (arguments.length) {
        case 0:
          throw argumentsRequired(0);
        case 1:
          throw argumentsRequired(1);
      }
      if (!this.contains(oldToken)) {
        return false;
      }
      this.remove(oldToken);
      this.add(newToken);
      return true;
    };
  }
}
