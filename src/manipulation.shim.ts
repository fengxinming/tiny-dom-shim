
function toNode(arg: any): Node {
  if (!arg || arg.nodeType === void 0) {
    arg = document.createTextNode(String(arg));
  }
  return arg;
}

function childrenToFragment(args: any[]): DocumentFragment | Node | null {
  switch (args.length) {
    case 0:
      return null;
    case 1:
      return toNode(args[0]);
  }

  const frag = document.createDocumentFragment();
  args.forEach((arg) => {
    if (!arg || arg.nodeType === void 0) {
      arg = document.createTextNode(String(arg));
    }
    frag.appendChild(arg);
  });
  return frag;
}

const ElementPrototype = Element.prototype;
if (!ElementPrototype.after) {
  ElementPrototype.after = function (...nodes: Array<string | Node>): void {
    const frag = childrenToFragment(nodes);
    const { parentNode } = this;
    if (frag === null || !parentNode) {
      return;
    }
    parentNode.insertBefore(frag, this.nextSibling);
  };
}

if (!ElementPrototype.append) {
  ElementPrototype.append = function (...nodes: Array<string | Node>): void {
    const frag = childrenToFragment(nodes);
    if (frag === null) {
      return;
    }
    this.appendChild(frag);
  };
}

if (!ElementPrototype.before) {
  ElementPrototype.before = function (...nodes: Array<string | Node>): void {
    const frag = childrenToFragment(nodes);
    const { parentNode } = this;
    if (frag === null || !parentNode) {
      return;
    }
    parentNode.insertBefore(frag, this);
  };
}

if (!ElementPrototype.prepend) {
  ElementPrototype.prepend = function (...nodes: Array<string | Node>): void {
    const frag = childrenToFragment(nodes);
    if (frag === null) {
      return;
    }
    this.insertBefore(frag, this.firstChild);
  };
}

if (!ElementPrototype.remove) {
  ElementPrototype.remove = function (): void {
    const { parentNode } = this;
    if (parentNode) {
      parentNode.removeChild(this);
    }
  };
}

if (!ElementPrototype.replace) {
  ElementPrototype.replace = function (...nodes: Array<string | Node>): void {
    const frag = childrenToFragment(nodes);
    const { parentNode } = this;
    if (frag === null || !parentNode) {
      return;
    }
    parentNode.replaceChild(frag, this);
  };
}
