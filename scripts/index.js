console.log('Hello, World');

const page = document.querySelector('.root');
const popupEdit = document.querySelector('.popup');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditSaveButton = popupEdit.querySelector('.popup__save-button');
const popupTxtInput = popupEdit.querySelectorAll('.popup__input');
const pageTxtName = document.querySelector('.profile__title');
const pageTxtAbout = document.querySelector('.profile__subtitle');
const popupForm = popupEdit.querySelector('.popup__profile-form');
let popupTxtName = popupEdit.querySelector('.popup__input_txt_name');
let popupTxtAbout = popupEdit.querySelector('.popup__input_txt_about');

// 1. Открытие и закрытие попапа
  /*const popupToggle = function (event) {
    console.log('Event: ', event);
    popupEdit.classList.toggle('popup_opened');
  };*/

  const popupOpen = function (event) {
    console.log('Event: ', event);
    popupEdit.classList.add('popup_opened');
  };

  const popupClose = function (event) {
    console.log('Event: ', event);
    popupEdit.classList.remove('popup_opened');
  };

  popupEditOpenButton.addEventListener('click', popupOpen);
  popupEditCloseButton.addEventListener('click', popupClose);



// 2. Поля формы
popupTxtName.value = pageTxtName.innerText;
popupTxtAbout.value = pageTxtAbout.innerText;

console.log(popupTxtName.value);
console.log(popupTxtAbout.value);

popupTxtName.value = pageTxtName.textContent.trim();
popupTxtAbout.value = pageTxtAbout.textContent.trim();




// 3. Редактирование имени и информации о себе

function formSubmitHandler (evt) {
    evt.preventDefault();
    // Получите значение полей из свойства value
    popupTxtName = popupTxtName.value
    popupTxtAbout = popupTxtAbout.value
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent


    popupEditCloseButton.addEventListener('click', popupToggle);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


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
