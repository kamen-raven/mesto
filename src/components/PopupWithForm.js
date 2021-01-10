import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    });
    return this._formValues;
  }


  /*   close() {
      super.close();

    } */

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

}
/* export const popupProfileEditForm = popupProfileEdit.querySelector('.popup__form_profile-edit')
export const popupCardAddForm = popupCardAdd.querySelector('.popup__form_card-add');
 */
/*
  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }


_setEventListeners() {
  this._element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());

    this._element.reset();
  })
}
 */
