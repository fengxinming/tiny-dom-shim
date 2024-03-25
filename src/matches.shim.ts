
const ElementPrototype = Element.prototype;

if (!ElementPrototype.matches) {
  ElementPrototype.matches
      = ElementPrototype.matchesSelector
      || ElementPrototype.mozMatchesSelector
      || ElementPrototype.msMatchesSelector
      || ElementPrototype.oMatchesSelector
      || ElementPrototype.webkitMatchesSelector
      || function (this: Element, s: string) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let i = matches.length;

        while (--i >= 0 && matches.item(i) !== this) {
          // empty
        }

        return i > -1;
      };
}

export {};
