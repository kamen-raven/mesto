export default class Popup {
	constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._keyHandlerEsc.bind(this));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._keyHandlerEsc.bind(this));
  }

	setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close()
    );
    this._popupSelector.addEventListener('mousedown', (event) => {
      this._closeByOverlay(event);
    });
	}

  _closeByOverlay(event) {
    const clicked = event.target;
    if (clicked.classList.contains('popup')) {
      this.close(clicked);
    }
  }

  _keyHandlerEsc(event) {
    if (event.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'));
    }
  }
}
