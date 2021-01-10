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

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import Popup from '../components/Popup.js';

//----------------------ФУНКЦИИ ОТКРЫТИЯ ПОПАПОВ



//создаем popup редактирования профиля
const popupUserForm = new PopupWithForm(
  popupProfileEdit, {
  handleFormSubmit: () => {
  //saveProfileInfo
  profileEditTxtName.textContent = popupProfileEditTxtName.value;
  profileEditTxtAbout.textContent = popupProfileEditTxtAbout.value;
  //это уйдет в UserInfo
  popupUserForm.close();
  }
});
popupUserForm.setEventListeners();




//создаем popup добавления карточек
const popupCardForm = new PopupWithForm(
  popupCardAdd, {
  handleFormSubmit: () => {
    addNewCard();
    popupCardForm.close();
  }
});
popupCardForm.setEventListeners();


//создаем popup просмотра карточек
const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();


//передаем данные из превью в большую карточку
const popupWithImageOpen = (name, link) => {
  popupWithImage.open(name, link);
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
//рубрика эксперименты...
/* const createCard = ({ data},  handleClickImage, cardSelector) => {
  const card = new Card({ data},  handleClickImage, cardSelector);
  const newCard = card.createCards();
  return newCard;
};

//отрисовка первичных карточек
const renderCards = ({ data},  handleClickImage, cardSelector) => {
  data.forEach((item) => {
    const newCard = createCard({ data: item},  handleClickImage, cardSelector);
    cardsContainer.append(newCard);
  });
};

renderCards({
  data: initialCards},
  popupWithImageOpen,
  '.template-cards');

//добавление новой карточки на страницу
const addNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  const newCard = createCard({ name: newCardName, link: newCardLink }, popupWithImageOpen, '.template-cards');  //вот тут не работает пока
  cardsContainer.prepend(newCard);
}; */



//------------------КАРТОЧКИ
//создание DOM-карточки
const createCard = (items, cardSelector) => {
  const card = new Card(items, cardSelector, popupWithImageOpen);
  const newCard = card.createCards();
  return newCard;
};

//отрисовка первичных карточек
const renderCards = (items, cardSelector, popupWithImageOpen) => {
  items.forEach((item) => {
    const newCard = createCard(item, cardSelector, popupWithImageOpen);
    cardsContainer.append(newCard);
  });
};

renderCards(initialCards, '.template-cards', popupWithImageOpen);

//добавление новой карточки на страницу
const addNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  const newCard = createCard({ name: newCardName, link: newCardLink }, '.template-cards', popupWithImageOpen);
  cardsContainer.prepend(newCard);
};







//-------------ПОПАПЫ


const formValidationCardAdd = new FormValidator(validationClasses, popupCardAddForm);
formValidationCardAdd.enableValidation();


//-----------РЕДАКТИРОВАНИЕ ПРОФИЛЯ









const formValidationProfileEdit = new FormValidator(validationClasses, popupProfileEditForm);
formValidationProfileEdit.enableValidation();



//--------------КНОПКИ СЛУШАТЕЛИ СОБЫТИЙ
//profile-edit события кнопок редактирования профиля
profileEditButtonOpen.addEventListener('click', () => {
  //loadProfileInfo
  popupProfileEditTxtName.value = profileEditTxtName.textContent.trim();
  popupProfileEditTxtAbout.value = profileEditTxtAbout.textContent.trim();
  //End
  popupUserForm.open();
  formValidationProfileEdit.resetValidation();
});

/* popupProfileEditButtonClose.addEventListener('click', () => {
  popupClose(popupProfileEdit);
}); */

//profile-edit закрытие по оверлею
/* popupProfileEdit.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupProfileEdit);
}); */

//сохранение попапа редактирования профиля
/* const popupProfileEditSaveForm = () => {

  //saveProfileInfo
  profileEditTxtName.textContent = popupProfileEditTxtName.value;
  profileEditTxtAbout.textContent = popupProfileEditTxtAbout.value;
  //это уйдет в UserInfo

  popupUserInfo.close();
};
 */

/* popupProfileEdit.addEventListener('submit', popupProfileEditSaveForm);

 */
//сохранение попапа добавления карточек
/* const popupCardAddSaveForm = () => {
  addNewCard();
  popupWithForm.close();
};
 */
//card-add события кнопок добавления карточек
cardAddOpen.addEventListener('click', () => {
  const form = document.forms.addNewCard;
  form.reset();
  popupCardForm.open();
  formValidationCardAdd.resetValidation();
});

/*
popupCardAdd.addEventListener('submit', popupCardAddSaveForm);

 */
/* popupCardAddButtonClose.addEventListener('click', () => {
  popupClose(popupCardAdd);
}); */
//card-add закрытие по оверлею
/* popupCardAdd.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupCardAdd);
}); */

//закрытие попапа большой карточки
/* popupImageViewButtonClose.addEventListener('click', () => {
  popupClose(popupImageView);
});

//закрытие по оверлею большой карточки
popupImageView.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupImageView);
}); */
