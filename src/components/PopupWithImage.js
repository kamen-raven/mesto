import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageViewBigImage = this._popupSelector.querySelector('.popup__figure-img');
    this._popupImageViewCaption = this._popupSelector.querySelector('.popup__figure-caption');
  }

  open(name, link) {
    super.open();
    this._popupImageViewBigImage.src = link;
    this._popupImageViewBigImage.alt = name;
    this._popupImageViewCaption.textContent = name;
  }
}

