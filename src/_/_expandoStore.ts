
let expandoSequence = 1;
const expandoKey = 'expando9527';
const cache = {} as any;

function nextId() {
  return ++expandoSequence;
}

function getStore(elem: Node): any {
  let expandoId = (elem as any)[expandoKey];
  let exStore = cache[expandoId || -1];
  if (!exStore) {
    expandoId = nextId();
    (elem as any)[expandoKey] = expandoId;
    exStore = {};
    cache[expandoId] = exStore;
  }
  return exStore;
}

export function set(elem: Node, key: string, value: any) {
  const exStore = getStore(elem);
  exStore[key] = value;
}

export function get(elem: Node, key: string) {
  const exStore = getStore(elem);
  return exStore[key];
}
