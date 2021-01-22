import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleFormSubmit }, formName) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._form = formName;
    this._saveButton = this._popupElement.querySelector('.popup__save-button');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    });
    return this._formValues;
  }

  setLoading(isLoad) {
    if (isLoad) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = "Сохранить";
    }
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

