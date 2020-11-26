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


/* const removeInputError = (popupFormElement, inputList) => {
  inputList.forEach((inputElement) => {
    hideInputError(popupFormElement, inputElement);
  })
} */


//проверка на валидность
const checkInputValidity = (popupFormElement, inputElement, classes) => {
  const notValidInput = !inputElement.validity.valid;
    if (notValidInput) {
      showInputError(popupFormElement, inputElement, classes);
    } else {
      hideInputError(popupFormElement, inputElement, classes);
    }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


const togglePopupSaveButtonState = (inputList, popupSaveButton, classes) => {
  if (hasInvalidInput(inputList)) {
    popupSaveButton.classList.add(classes.inactiveButtonClass);
    popupSaveButton.setAttribute('disabled', true);
  } else {
    popupSaveButton.classList.remove(classes.inactiveButtonClass);
    popupSaveButton.removeAttribute('disabled');
  }
}



//слушатели
const setEventListeners = (popupFormElement, classes) => {
  const inputList = Array.from(popupFormElement.querySelectorAll(classes.inputSelector));
  const popupSaveButton = popupFormElement.querySelector(classes.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        togglePopupSaveButtonState(inputList, popupSaveButton, classes);
        checkInputValidity(popupFormElement, inputElement, classes);
      });
    });



togglePopupSaveButtonState(inputList, popupSaveButton, classes);
}




//запускаем валидацию
const enableValidation = (classes) => {
  const popupFormList = Array.from(document.querySelectorAll(classes.formSelector));
    popupFormList.forEach((popupFormElement) => {
      setEventListeners(popupFormElement, classes);
      popupFormElement.addEventListener('submit', (event) => {
        event.preventDefault();  //не отправляем форму
      });
  });
}

enableValidation(validationClasses)
