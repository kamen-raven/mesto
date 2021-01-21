import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupForm = this._popupElement.querySelector('.popup__form_confirm-delete')
  }

  setSubmitAction(submitAction) {
    this._handleSubmiteCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmiteCallback();
    });
  }
}

