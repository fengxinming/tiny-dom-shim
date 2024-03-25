
const { body } = document;
const support: {[key: string]: boolean} = {
  classList: !!body.classList,
  append: !!body.append,
  prepend: !!body.prepend,
  after: !!body.after,
  before: !!body.before,
  createContextualFragment: window.Range && 'createContextualFragment' in window.Range.prototype
};

export default support;
