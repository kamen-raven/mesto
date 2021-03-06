export default class FormValidator {
  constructor(validationSettings, popupForm) {
    this._validvalidationSettings = validationSettings;
    this._popupForm = popupForm;
    this._inputList = this._popupForm.querySelectorAll(this._validvalidationSettings.inputSelector);
    this._submitButton = this._popupForm.querySelector(this._validvalidationSettings.submitButtonSelector);
  }

  //показать ошибку
  _showInputError(inputElement) {
    const errorElement = this._popupForm.querySelector(`#${inputElement.id}-error`);
    const errorMessage = inputElement.validationMessage;
    inputElement.classList.add(this._validvalidationSettings.inputErrorClass);
    errorElement.classList.add(this._validvalidationSettings.errorClass);
    errorElement.textContent = errorMessage;
  }

  //спрятать ошибку
  _hideInputError(inputElement) {
    const errorElement = this._popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validvalidationSettings.inputErrorClass);
    errorElement.classList.remove(this._validvalidationSettings.errorClass);
    errorElement.textContent = "";
  }

  //проверка на валидность
  _checkInputValidity(inputElement) {
    const notValidInput = !inputElement.validity.valid;
    if (notValidInput) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //изменение состояния кнопки
  _toggleButtonState(checkValid) {
    if (checkValid) {
      this._submitButton.classList.remove(this._validvalidationSettings.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.classList.add(this._validvalidationSettings.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }
  }

  //слушатели
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._popupForm.checkValidity());
      });
    });
  }

  //сброс валидации
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(this._popupForm.checkValidity());
    });
  }

  //запускаем валидацию
  enableValidation() {
    this._setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();  //не отправляем форму
    });
  }
};
