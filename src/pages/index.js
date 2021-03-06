//--------------ИМПОРТ
import './index.css'; // импорт css-стилей

import { validationClasses } from '../utils/data.js';
import {
  templateCards,
  cardsContainer,
  profileInfoForm,
  profileTxtName,
  profileTxtAbout,
  profileAvatar,
  profileEditButtonOpen,
  cardAddOpen,
  avatarEditButton,
  popupProfileEdit,
  popupProfileForm,
  popupProfileTxtName,
  popupProfileTxtAbout,
  profileAvatarEdit,
  avatarEdit,
  avatarEditForm,
  addNewCardForm,
  popupCardAdd,
  popupCardAddForm,
  popupImageView,
  popupConfirmDelete
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

//контейнер для хранения ID текущего пользователя
let myUserId = "";

//-----ИНИЦИАЛИЗАЦИЯ КЛАССА API
const api = new Api({
  address: 'https://mesto.nomoreparties.co',
  token: '39cff778-54be-45db-8f91-d96bf9b92859',
  cohortId: 'cohort-19'
});


//--------------ИНИЦИАЛИЗАЦИЯ КЛАССОВ ВАЛИДАЦИИ ФОРМ
//валидация формы добавления карточки
const formValidationCardAdd = new FormValidator(validationClasses, popupCardAddForm);
formValidationCardAdd.enableValidation();

//валидация формы профиля
const formValidationProfileEdit = new FormValidator(validationClasses, popupProfileForm);
formValidationProfileEdit.enableValidation();

//валидация формы редактирования аватара
const formValidationAvatarEdit = new FormValidator(validationClasses, avatarEditForm);
formValidationAvatarEdit.enableValidation();


//--------------ИНИЦИАЛИЗАЦИЯ КЛАССА ПРОФИЛЯ
const userInfo = new UserInfo(profileTxtName, profileTxtAbout, profileAvatar);


//создаем popup редактирования профиля
const popupUserForm = new PopupWithForm(
  popupProfileEdit, {
  handleFormSubmit: (data) => {
    popupUserForm.setLoading(true);
    api.patchUserInfo(data)
      .then((data) => {
        const newProfileName = data.name;
        const newProfileAbout = data.about;
        userInfo.setUserInfo(newProfileName, newProfileAbout);
        popupUserForm.closeWithReset();
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при редактировании инфомрации профиля: ${error}`)
      })
      .finally(() => {
        popupUserForm.setLoading(false);
      })
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


//создаем popup редактирования аватара
const popupAvatarEdit = new PopupWithForm(
  avatarEdit, {
  handleFormSubmit: (data) => {
    popupAvatarEdit.setLoading(true);
    api.patchUserAvatar(data)
      .then((data) => {
        userInfo.setAvatar(data.avatar)
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при редактировании аватара: ${error}`)
      })
      .finally(() => {
        popupAvatarEdit.setLoading(false);
      })
  }
},
  profileAvatarEdit
);
popupAvatarEdit.setEventListeners();

//слушатель кнопки редактирования аватара
avatarEditButton.addEventListener('click', () => {
  popupAvatarEdit.closeWithReset();
  popupAvatarEdit.open();
  formValidationAvatarEdit.resetValidation();
});



//создаем popup просмотра карточек
const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();

//создаем popup подтверждения удаления
const popupDelete = new PopupConfirm(popupConfirmDelete);
popupDelete.setEventListeners();


//создаем функцию инициализации карточки
const createCard = (item, curretUserId) => {
  const card = new Card(
    item,
    curretUserId,
    {
      handleClickImage: () => {
        popupWithImage.open(item.name, item.link);
      },
      handleClickLike: (cardId, isLiked) => {
        if (isLiked) {
          api.deleteLike(cardId)
            .then((data) => {
              card.setLikes(data.likes)
            })
            .catch((error) => {
              console.lod(`Хьюстон, у нас проблема при снятии лайка с карточки: ${error}`)
            })
        } else {
          api.putLike(cardId)
            .then((data) => {
              card.setLikes(data.likes)
            })
            .catch((error) => {
              console.log(`Хьюстон, у нас проблема при лайке карточки: ${error}`)
            })
        }
      },
      handleClickDelete: (cardId) => {
        popupDelete.setSubmitAction(() => {
          api.deleteCard(cardId)
            .then(() => {
              card.removeCard();
              popupDelete.close();
            })
            .catch((error) => {
              console.log(`Хьюстон, у нас проблема при удалении карточки: ${error}`)
            })
        }),
          popupDelete.open();
      }
    },
    templateCards //'.template-cards'
  );
  return card.createCards();
};

//создаем класс Section
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item, myUserId);
    cardList.appendItem(card);
  }
},
  cardsContainer//'.cards'
);


//создаем popup добавления карточек
const popupCardForm = new PopupWithForm(
  popupCardAdd, {
  handleFormSubmit: (data) => {
    popupCardForm.setLoading(true);
    api.postNewCard(data)
      .then((data) => {
        const newCard = createCard(data, myUserId);
        cardList.prependItem(newCard);
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при добавлении новой карточки: ${error}`)
      })
      .finally(() => {
        popupCardForm.setLoading(false);
      })
  }
},
  addNewCardForm
);
popupCardForm.setEventListeners();

//card-add события кнопок добавления карточек
cardAddOpen.addEventListener('click', () => {
  popupCardForm.closeWithReset();
  popupCardForm.open();
  formValidationCardAdd.resetValidation();
});



//первоначальная загрузка информации с сервера
Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
  .then(([userValue, initialCards]) => {
    myUserId = userValue._id;
    userInfo.setUserInfo(userValue.name, userValue.about);
    userInfo.setAvatar(userValue.avatar);
    cardList.renderItems(initialCards);
  })
  .catch((error) => {
    console.log(`Хьюстон, у нас проблема при загрузке первоначальной информации: ${error}`)
  });
