import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleFormSubmit }, formName) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._form = formName;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    });
    return this._formValues;
  }

  closeWithReset() {
    super.close();
    this._form.reset();
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      this.closeWithReset();
    });
  }
}

