//--------------ИМПОРТ
import './index.css'; // импорт css-стилей

import { initialCards, validationClasses } from '../utils/data.js';
import {
  profileTxtName,
  profileTxtAbout,
  profileEditButtonOpen,
  cardAddOpen,
  popupProfileEdit,
  popupProfileForm,
  popupProfileTxtName,
  popupProfileTxtAbout,
  popupCardAdd,
  popupCardAddForm,
  popupCardAddName,
  popupCardAddLink,
  popupImageView,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';


//--------------ИНИЦИАЛИЗАЦИЯ КЛАССОВ ВАЛИДАЦИИ ФОРМ
const formValidationCardAdd = new FormValidator(validationClasses, popupCardAddForm);
formValidationCardAdd.enableValidation();

const formValidationProfileEdit = new FormValidator(validationClasses, popupProfileForm);
formValidationProfileEdit.enableValidation();


//--------------ИНИЦИАЛИЗАЦИЯ КЛАССА ПРОФИЛЯ
const userInfo = new UserInfo(profileTxtName, profileTxtAbout);


//создаем popup редактирования профиля
const popupUserForm = new PopupWithForm(
  popupProfileEdit, {
  handleFormSubmit: () => {
    const newProfileName = popupProfileTxtName.value;
    const newProfileAbout = popupProfileTxtAbout.value;
    userInfo.setUserInfo(newProfileName, newProfileAbout);
    popupUserForm.close();
  }
});
popupUserForm.setEventListeners();


//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditButtonOpen.addEventListener('click', () => {
  const userInfoValue = userInfo.getUserInfo();
  //loadProfileInfo
  popupProfileTxtName.value = userInfoValue.name;
  popupProfileTxtAbout.value = userInfoValue.about;
  //End
  popupUserForm.open();
  formValidationProfileEdit.resetValidation();
});


//создаем popup просмотра карточек
const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();


//создаем функцию инициализации карточки
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleClickImage: () => {
      popupWithImage.open(item.name, item.link);
    },
  },
    '.template-cards'
  );
  cardList.addItem(card.createCards());
};

//создаем класс Section
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    createCard(item);
  }
},
  '.cards'
);

cardList.renderItems();


//создаем popup добавления карточек
const popupCardForm = new PopupWithForm(
  popupCardAdd, {
  handleFormSubmit: () => {
    addNewCard();
    popupCardForm.close();
  }
});
popupCardForm.setEventListeners();

//добавление новой карточки на страницу
const addNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  createCard({ name: newCardName, link: newCardLink });
};

//card-add события кнопок добавления карточек
cardAddOpen.addEventListener('click', () => {
  const form = document.forms.addNewCard;
  form.reset();
  popupCardForm.open();
  formValidationCardAdd.resetValidation();
});




