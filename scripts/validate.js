/* // включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
 */

 //показать ошибку
const showInputError = (popupFormElement, inputElement, errorMessage) => {
  const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
}

//спрятать ошибку
const hideInputError = (popupFormElement, inputElement) => {
  const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = "";
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

//слушатели
const setEventListeners = (popupFormElement) => {
  const inputList = Array.from(popupFormElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popupFormElement, inputElement);
    })
  });
}





//запускаем валидацию
const enableValidation = () => {
  const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
    popupFormList.forEach((popupFormElement) => {
      popupFormElement.addEventListener('submit', (event) => {
        event.preventDefault();  //не отправляем форму
      });
    setEventListeners(popupFormElement);
  });
}

enableValidation()
