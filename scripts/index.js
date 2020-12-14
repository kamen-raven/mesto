//cards
const cardsContainer = document.querySelector('.cards');

//profile
//profile info content
const profileEditTxtName = document.querySelector('.profile__title');
const profileEditTxtAbout = document.querySelector('.profile__subtitle');
//profile buttons
const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const cardAddOpen = document.querySelector('.profile__add-button');

//popup profile-edit
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupProfileEditButtonClose = popupProfileEdit.querySelector('.popup__close-button');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__form_profile-edit');
const popupProfileEditTxtName = popupProfileEdit.querySelector('.popup__input_profile-edit_name');
const popupProfileEditTxtAbout = popupProfileEdit.querySelector('.popup__input_profile-edit_about');
//popup add-card
const popupCardAdd = document.querySelector('.popup_card-add');
const popupCardAddButtonClose = popupCardAdd.querySelector('.popup__close-button');
const popupCardAddForm = popupCardAdd.querySelector('.popup__form_card-add');
const popupCardAddName = popupCardAdd.querySelector('.popup__input_card-add_name');
const popupCardAddLink = popupCardAdd.querySelector('.popup__input_card-add_link');
const popupCardAddButtonImage = document.querySelector('.card__image-button');
//popup image-view
const popupImageView = document.querySelector('.popup_image-view');
const popupImageViewButtonClose = popupImageView.querySelector('.popup__close-button');
const popupImageViewBigImage = popupImageView.querySelector('.popup__figure-img');
const popupImageViewCaption = popupImageView.querySelector('.popup__figure-caption');


//открытие и закрытие попапов
const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandlerEsc);
};

const popupClose = (popup) => {
  popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandlerEsc);
};

//передаем данные из превью в большую карточку
const popupImageViewOpen = (name, link) => {
  popupImageViewBigImage.src = link;
  popupImageViewBigImage.alt = name;
  popupImageViewCaption.textContent = name;
    popupOpen(popupImageView);
}

//----------------------ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ

//функция закрытия по оверлею
const popupCloseByOverlay = (event, popup) => {
  if (event.target != event.currentTarget) {
    return
  }
  popupClose(popup);
}

//функция закрытия попапов по esc
const keyHandlerEsc = (event) => {
  if (event.key === 'Escape') {
    popupClose(document.querySelector('.popup_opened'));
  }
}

//------------------КАРТОЧКИ
const renderCards = (items, cardSelector, popupImageViewOpen) => {
  items.forEach((items) => {
    const card = new Card(items, cardSelector, popupImageViewOpen);
    const newCard = card.createCards();
  cardsContainer.append(newCard);
  });
}

renderCards(initialCards, '.template-cards', popupImageViewOpen);

//создание карточки
const addNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  const card = new Card({name: newCardName, link: newCardLink}, '.template-cards', popupImageViewOpen);
  const newCard = card.createCards();
    cardsContainer.prepend(newCard);
}


//сохранение попапа добавления карточек
const popupCardAddSaveForm = (event) => {
  event.preventDefault();
  addNewCard();
  popupClose(popupCardAdd);
}

const formValidationCardAdd = new FormValidator(validationClasses, popupCardAddForm);
formValidationCardAdd.enableValidation();



//-----------РЕДАКТИРОВАНИЕ ПРОФИЛЯ

//сохранение попапа редактирования профиля
const popupProfileEditSaveForm = (event) => {
  event.preventDefault();
  //saveProfileInfo
    profileEditTxtName.textContent = popupProfileEditTxtName.value;
    profileEditTxtAbout.textContent = popupProfileEditTxtAbout.value;
  popupClose(popupProfileEdit);
}


const formValidationProfileEdit = new FormValidator(validationClasses, popupProfileEditForm);
formValidationProfileEdit.enableValidation();



//--------------КНОПКИ СЛУШАТЕЛИ СОБЫТИЙ
//profile-edit события кнопок редактирования профиля
profileEditButtonOpen.addEventListener('click', () => {
    //loadProfileInfo
      popupProfileEditTxtName.value = profileEditTxtName.textContent.trim();
      popupProfileEditTxtAbout.value = profileEditTxtAbout.textContent.trim();
    popupOpen(popupProfileEdit);
    formValidationProfileEdit.resetValidation();
      }
);
popupProfileEditButtonClose.addEventListener('click', () => {
    popupClose(popupProfileEdit);
      }
);
//profile-edit закрытие по оверлею
popupProfileEdit.addEventListener('mousedown', (event) => {
    popupCloseByOverlay(event, popupProfileEdit);
      }
);

popupProfileEditForm.addEventListener('submit', popupProfileEditSaveForm);





//card-add события кнопок добавления карточек
cardAddOpen.addEventListener('click', () => {
    const form = document.forms.addNewCard;
      form.reset();
    popupOpen(popupCardAdd);
    formValidationCardAdd.resetValidation();
      }
);
popupCardAddButtonClose.addEventListener('click', () => {
    popupClose(popupCardAdd);
      }
);
//card-add закрытие по оверлею
popupCardAdd.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupCardAdd);
      }
);

popupCardAddForm.addEventListener('submit', popupCardAddSaveForm);


//закрытие попапа большой карточки
popupImageViewButtonClose.addEventListener('click',  () => {
  popupClose(popupImageView);
      }
);
//закрытие по оверлею большой карточки
popupImageView.addEventListener('mousedown', (event) => {
  popupCloseByOverlay(event, popupImageView);
      }
);


//--------------ИМПОРТ
import {initialCards, validationClasses} from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


