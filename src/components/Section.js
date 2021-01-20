export default class Section {
  constructor( {renderer}, containerElement) {
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  renderItems(items) {
    items.forEach((item) => {
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

