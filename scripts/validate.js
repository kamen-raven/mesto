const validationClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

 //показать ошибку
const showInputError = (popupFormElement, inputElement, classes) => {
  const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
  const errorMessage = inputElement.validationMessage;
        inputElement.classList.add(classes.inputErrorClass);
        errorElement.classList.add(classes.errorClass);
        errorElement.textContent = errorMessage;
}

//спрятать ошибку
const hideInputError = (popupFormElement, inputElement, classes) => {
  const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(classes.inputErrorClass);
        errorElement.classList.remove(classes.errorClass);
        errorElement.textContent = "";
}

//сброс валидации
const resetValidation = (popupFormElement, classes) => {
  const inputList = popupFormElement.querySelectorAll(classes.inputSelector);
        inputList.forEach((inputElement) => {
          hideInputError(popupFormElement, inputElement, classes);
          const submitButton = popupFormElement.querySelector(classes.submitButtonSelector);
          toggleButtonState(submitButton, popupFormElement.checkValidity(), classes);
        });
}


//проверка на валидность
const checkInputValidity = (popupFormElement, inputElement, classes) => {
  const notValidInput = !inputElement.validity.valid;
    if (notValidInput) {
      showInputError(popupFormElement, inputElement, classes);
    } else {
      hideInputError(popupFormElement, inputElement, classes);
    }
}


//изменение состояния кнопки
const  toggleButtonState = (button, checkValid, classes) => {
  if (checkValid) {
    button.classList.remove(classes.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(classes.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}


//слушатели
const setEventListeners = (popupFormElement, classes) => {
  const submitButton = popupFormElement.querySelector(classes.submitButtonSelector);
        toggleButtonState(submitButton, popupFormElement.checkValidity(), classes);
  const inputList = popupFormElement.querySelectorAll(classes.inputSelector);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            checkInputValidity(popupFormElement, inputElement, classes);
            toggleButtonState(submitButton, popupFormElement.checkValidity(), classes);
          });
        });
}


//запускаем валидацию
const enableValidation = (classes) => {
  const popupFormList = document.querySelectorAll(classes.formSelector);
        popupFormList.forEach((popupFormElement) => {
          setEventListeners(popupFormElement, classes);
            popupFormElement.addEventListener('submit', (event) => {
              event.preventDefault();  //не отправляем форму
            });
        });
}

enableValidation(validationClasses);
