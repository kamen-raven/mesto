console.log('Hello, World');

const page = document.querySelector('.root');
const popupEdit = document.querySelector('.popup');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditSaveButton = popupEdit.querySelector('.popup__save-button');
const popupTxtInput = popupEdit.querySelectorAll('.popup__input');
const popupTxtName = popupEdit.querySelector('.popup__input_txt_name');
const popupTxtAbout = popupEdit.querySelector('.popup__input_txt_about');


const popupToggle = function(event) {
  console.log('Event: ', event);
  popupEdit.classList.toggle('popup_opened');
}

popupEditOpenButton.addEventListener('click', popupToggle);
popupEditCloseButton.addEventListener('click', popupToggle)
/**

// находим элемент .button и кладём в переменную
let button = document.querySelector('.button');

// обращаемся к переменной, добавляем элементу слушатель клика
button.addEventListener('click', function () {
  // что происходит при клике по кнопке
});



*/


/**
// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = // Воспользуйтесь инструментом .querySelector()
    let jobInput = // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
*/
