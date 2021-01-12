import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImageViewBigImage = this._popupElement.querySelector('.popup__figure-img');
    this._popupImageViewCaption = this._popupElement.querySelector('.popup__figure-caption');
  }

  open(name, link) {
    super.open();
    this._popupImageViewBigImage.src = link;
    this._popupImageViewBigImage.alt = name;
    this._popupImageViewCaption.textContent = name;
  }
}

