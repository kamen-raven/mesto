//--------------ИМПОРТ
import './index.css'; // импорт css-стилей

import { initialCards, validationClasses } from '../utils/data.js';
import {
  cardsContainer,
  profileEditTxtName,
  profileEditTxtAbout,
  profileEditButtonOpen,
  cardAddOpen,
  popupProfileEdit,
  popupProfileEditButtonClose,
  popupProfileEditForm,
  popupProfileEditTxtName,
  popupProfileEditTxtAbout,
  popupCardAdd,
  popupCardAddButtonClose,
  popupCardAddForm,
  popupCardAddName,
  popupCardAddLink,
  popupImageView,
  popupImageViewButtonClose,
  popupImageViewBigImage,
  popupImageViewCaption
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';


//----------------------ФУНКЦИИ ОТКРЫТИЯ ПОПАПОВ


const popupWithImage = new Popup(popupImageView);
popupWithImage.setEventListeners();

const popupUserInfo = new Popup(popupProfileEdit);
popupUserInfo.setEventListeners();

const popupWithForm = new Popup(popupCardAdd);
popupWithForm.setEventListeners();





/* const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandlerEsc);
}; */

//передаем данные из превью в большую карточку
const popupImageViewOpen = (name, link) => {
  popupImageViewBigImage.src = link;
  popupImageViewBigImage.alt = name;
  popupImageViewCaption.textContent = name;
  popupWithImage.open();
};

//----------------------ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ
/* const popupClose = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandlerEsc);
}; */

//функция закрытия по оверлею
/* const popupCloseByOverlay = (event) => {
  const clicked = event.target;
  if (clicked.classList.contains('popup')) {
    popupClose(clicked);
  }
}; */

//функция закрытия попапов по esc
/* const keyHandlerEsc = (event) => {
  if (event.key === 'Escape') {
    popupClose(document.querySelector('.popup_opened'));
  }
}; */


//--------Section




//------------------КАРТОЧКИ
//создание DOM-карточки
const createCard = (items, cardSelector) => {
  const card = new Card(items, cardSelector, popupImageViewOpen);
  const newCard = card.createCards();
  return newCard;
};

//отрисовка первичных карточек
const renderCards = (items, cardSelector, popupImageViewOpen) => {
  items.forEach((item) => {
    const newCard = createCard(item, cardSelector, popupImageViewOpen);
    cardsContainer.append(newCard);
  });
};

renderCards(initialCards, '.template-cards', popupImageViewOpen);

//добавление новой карточки на страницу
const addNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  const newCard = createCard({ name: newCardName, link: newCardLink }, '.template-cards', popupImageViewOpen);
  cardsContainer.prepend(newCard);
};


//-------------ПОПАПЫ
//сохранение попапа добавления карточек
const popupCardAddSaveForm = () => {
  addNewCard();
  popupWithForm.close();
};

const formValidationCardAdd = new FormValidator(validationClasses, popupCardAddForm);
formValidationCardAdd.enableValidation();


//-----------РЕДАКТИРОВАНИЕ ПРОФИЛЯ


//сохранение попапа редактирования профиля
const popupProfileEditSaveForm = () => {

  //saveProfileInfo
  profileEditTxtName.textContent = popupProfileEditTxtName.value;
  profileEditTxtAbout.textContent = popupProfileEditTxtAbout.value;
  popupUserInfo.close();
};


const formValidationProfileEdit = new FormValidator(validationClasses, popupProfileEditForm);
formValidationProfileEdit.enableValidation();








//--------------КНОПКИ СЛУШАТЕЛИ СОБЫТИЙ
//profile-edit события кнопок редактирования профиля
profileEditButtonOpen.addEventListener('click', () => {
  //loadProfileInfo
  popupProfileEditTxtName.value = profileEditTxtName.textContent.trim();
  popupProfileEditTxtAbout.value = profileEditTxtAbout.textContent.trim();
  //End
  popupUserInfo.open();
  formValidationProfileEdit.resetValidation();
});

/* popupProfileEditButtonClose.addEventListener('click', () => {
  popupClose(popupProfileEdit);
}); */

//profile-edit закрытие по оверлею
/* popupProfileEdit.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupProfileEdit);
}); */

popupProfileEditForm.addEventListener('submit', popupProfileEditSaveForm);


//card-add события кнопок добавления карточек
cardAddOpen.addEventListener('click', () => {
  const form = document.forms.addNewCard;
  form.reset();
  popupWithForm.open();
  formValidationCardAdd.resetValidation();
});

/* popupCardAddButtonClose.addEventListener('click', () => {
  popupClose(popupCardAdd);
}); */
//card-add закрытие по оверлею
/* popupCardAdd.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupCardAdd);
}); */

popupCardAddForm.addEventListener('submit', popupCardAddSaveForm);


//закрытие попапа большой карточки
/* popupImageViewButtonClose.addEventListener('click', () => {
  popupClose(popupImageView);
});

//закрытие по оверлею большой карточки
popupImageView.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupImageView);
}); */
