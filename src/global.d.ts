
declare global {
  interface Element {
    document: Document;
    matchesSelector: Element['matches'];
    mozMatchesSelector: Element['matches'];
    msMatchesSelector: Element['matches'];
    oMatchesSelector: Element['matches'];
    replace: (...nodes: Array<string | Node>) => void;
  }
}
export {};
