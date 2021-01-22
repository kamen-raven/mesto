export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._keyHandlerEsc = this._keyHandlerEsc.bind(this);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
  }

  //открытие
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._keyHandlerEsc);
  }

  //закрытие
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._keyHandlerEsc);
  }

  //навешиваем слушатели
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('mousedown', (event) => {
      this._closeByOverlay(event);
    });
  }

  _closeByOverlay(event) {
    const clicked = event.target;
    if (clicked.classList.contains('popup')) {
      this.close();
    }
  }

  _keyHandlerEsc(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
