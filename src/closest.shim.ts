
import './matches.shim';

const ElementPrototype = Element.prototype;

if (!ElementPrototype.closest) {
  ElementPrototype.closest = function (this: Element, s: string) {
    let el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }
    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement as Element;
    } while (el !== null);
    return null;
  };
}

export {};
