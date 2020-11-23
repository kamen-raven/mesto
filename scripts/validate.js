const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

 //показать ошибку
const showInputError = (popupFormElement, inputElement, errorMessage) => {
  const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(classes.inputErrorClass);
    errorElement.classList.add(classes.errorClass);
    errorElement.textContent = errorMessage;
}

//спрятать ошибку
const hideInputError = (popupFormElement, inputElement) => {
  const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(classes.inputErrorClass);
    errorElement.classList.remove(classes.errorClass);
    errorElement.textContent = "";
}


const removeInputError = (popupFormElement, inputList) => {
  inputList.forEach((inputElement) => {
    hideInputError(popupFormElement, inputElement);
  })
}


//проверка на валидность
const checkInputValidity = (popupFormElement, inputElement) => {
  const notValidInput = !inputElement.validity.valid;
    if (notValidInput) {
      const errorMessage = inputElement.validationMessage;
      showInputError(popupFormElement, inputElement, errorMessage);
    } else {
      hideInputError(popupFormElement, inputElement);
    }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


const togglePopupSaveButtonState = (inputList, popupSaveButton) => {
  if (hasInvalidInput(inputList)) {
    popupSaveButton.classList.add(classes.inactiveButtonClass);
    popupSaveButton.setAttribute('disabled', true);
  } else {
    popupSaveButton.classList.remove(classes.inactiveButtonClass);
    popupSaveButton.removeAttribute('disabled');
  }
}



//слушатели
const setEventListeners = (popupFormElement) => {
  const inputList = Array.from(popupFormElement.querySelectorAll(classes.inputSelector));
  const popupSaveButton = popupFormElement.querySelector(classes.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      togglePopupSaveButtonState(inputList, popupSaveButton);
      checkInputValidity(popupFormElement, inputElement);
    });
  });
togglePopupSaveButtonState(inputList, popupSaveButton);
}




//запускаем валидацию
const enableValidation = () => {
  const popupFormList = Array.from(document.querySelectorAll(classes.formSelector));
    popupFormList.forEach((popupFormElement) => {
      popupFormElement.addEventListener('submit', (event) => {
        event.preventDefault();  //не отправляем форму
      });
    setEventListeners(popupFormElement);
  });
}

enableValidation(classes)
