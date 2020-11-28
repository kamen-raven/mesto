//cards
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.template-cards').content;

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

//подписываемся на кнопки у карточек
const cardsImageButtonListener = (card) => {
  const buttonImage = card.querySelector('.card__image-button');
        buttonImage.addEventListener('click', (event) => {
          const img = event.target.closest('.card__image');
            popupImageViewBigImage.src = img.src;
            popupImageViewBigImage.alt = img.alt;
            popupImageViewCaption.textContent = img.alt;
              popupOpen(popupImageView);
        });
}

//создание карточки
const createCards = ({name, link}) => {
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
          cardImage.src = link;
          cardImage.alt = name;
          cardTitle.textContent = name;
    //like
    const cardButtonLike = newCard.querySelector('.card__like-button');
    const cardButtonLikeActive = (event) => {
      event.target.classList.toggle('card__like-button_active');
    }
        cardButtonLike.addEventListener('click', cardButtonLikeActive);
    //like-end
    //remove
    const cardButtonRemove = newCard.querySelector('.card__remove-button');
    const cardButtonRemoveClick = () => {
      cardButtonRemove.closest('.card').remove();
    }
        cardButtonRemove.addEventListener('click', cardButtonRemoveClick);
    //remove-end
    cardsImageButtonListener(newCard);
  return newCard;
}


const renderCards = () => {
  initialCards.forEach(({name, link}) => {
    const newCard = createCards({name, link});
      cardsContainer.append(newCard);
  });
}


renderCards();

//добавление новой карточки
const addNewCard = () => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  const newCard = createCards({name: newCardName, link: newCardLink});
    cardsContainer.prepend(newCard);
}


//сохранение попапа добавления карточек
const popupCardAddSaveForm = (event) => {
  event.preventDefault();
  addNewCard();
  popupClose(popupCardAdd);
}


//-----------РЕДАКТИРОВАНИЕ ПРОФИЛЯ

//сохранение попапа редактирования профиля
const popupProfileEditSaveForm = (event) => {
  event.preventDefault();
  //saveProfileInfo
    profileEditTxtName.textContent = popupProfileEditTxtName.value;
    profileEditTxtAbout.textContent = popupProfileEditTxtAbout.value;
  popupClose(popupProfileEdit);
}



//--------------КНОПКИ СЛУШАТЕЛИ СОБЫТИЙ

//profile-edit события кнопок редактирования профиля
profileEditButtonOpen.addEventListener('click', () => {
    //loadProfileInfo
      popupProfileEditTxtName.value = profileEditTxtName.textContent.trim();
      popupProfileEditTxtAbout.value = profileEditTxtAbout.textContent.trim();
    popupOpen(popupProfileEdit);
    resetValidation(popupProfileEditForm, validationClasses);
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
    resetValidation(popupCardAddForm, validationClasses);
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
