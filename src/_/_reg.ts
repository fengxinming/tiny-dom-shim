
// export const fragmentRE = /^\s*<(\w+|!)[^>]*>/;
// export const singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

const whitespace = '\\x20\\t\\r\\n\\f';
export const whitespaceRE = new RegExp(`[${whitespace}]+`);
export const nothtmlwhiteRE = new RegExp(`[^${whitespace}]+`, 'g');
