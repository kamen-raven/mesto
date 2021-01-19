//--------------ИМПОРТ
import './index.css'; // импорт css-стилей

import { validationClasses } from '../utils/data.js';
import {
  templateCards,
  cardsContainer,
  profileInfoForm,
  profileTxtName,
  profileTxtAbout,
  profileEditButtonOpen,
  cardAddOpen,
  popupProfileEdit,
  popupProfileForm,
  popupProfileTxtName,
  popupProfileTxtAbout,
  addNewCardForm,
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
import Api from '../components/Api.js';


//-----ИНИЦИАЛИЗАЦИЯ КЛАССА API
const api = new Api({
  address: 'https://mesto.nomoreparties.co',
  token: '39cff778-54be-45db-8f91-d96bf9b92859',
  cohortId: 'cohort-19'
});

//первоначальная загрузка информации с сервера
Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
  .then((arrayValue) => {
    const userValue = arrayValue[0];
    const InitialCards = arrayValue[1];
    userInfo.setUserInfo(userValue.name, userValue.about);
    cardList.renderItems(InitialCards);
  })
  .catch((error) => {
    console.log(`Хьюстон, у нас проблема: ${error}`)
  });

//--------------ИНИЦИАЛИЗАЦИЯ КЛАССОВ ВАЛИДАЦИИ ФОРМ
//валидация формы добавления карточки
const formValidationCardAdd = new FormValidator(validationClasses, popupCardAddForm);
formValidationCardAdd.enableValidation();

//валидация формы профиля
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
    popupUserForm.closeWithReset();
  }
},
  profileInfoForm
);
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
    templateCards //'.template-cards'
  );
  return card.createCards();;
};

//создаем класс Section
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.appendItem(card);
  }
},
  cardsContainer//'.cards'
);



//создаем popup добавления карточек
const popupCardForm = new PopupWithForm(
  popupCardAdd, {
  handleFormSubmit: () => {
    const newCard = createNewCard();
    cardList.prependItem(newCard);
  }
},
  addNewCardForm
);
popupCardForm.setEventListeners();

//добавление новой карточки на страницу
const createNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  return createCard({ name: newCardName, link: newCardLink });
};


//card-add события кнопок добавления карточек
cardAddOpen.addEventListener('click', () => {
  popupCardForm.closeWithReset();
  popupCardForm.open();
  formValidationCardAdd.resetValidation();
});



