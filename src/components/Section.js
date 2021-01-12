export default class Section {
  constructor({ data, renderer }, containerElement) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item)
    });
  }

  appendItem(element) {
    this._containerElement.append(element);
  }

  prependItem(element) {
    this._containerElement.prepend(element);
  }
}
