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
const cardButtonLike = document.querySelectorAll('.card__like-button');

//profile
//profile info content
const profileEditTxtName = document.querySelector('.profile__title');
const profileEditTxtAbout = document.querySelector('.profile__subtitle');
//profile buttons
const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileCardAddOpen = document.querySelector('.profile__add-button');

//popup (all)
const popup = document.querySelector('.popup');

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



//создание "изначальных" карточек из массива
  const createCards = ({name, link}) => {
    const cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.card__image').src = link;
      cardElement.querySelector('.card__image').alt = name;
      cardElement.querySelector('.card__title').textContent = name;
      cardsContainer.append(cardElement);
}

//отрисовка "изначальных" карточек из массива
  const renderCards = (name, link) => {
    cardsContainer.innerHTML = "";
    initialCards.forEach(createCards);
}


const addNewCard = (name, link) => {
  const newCardName = popupCardAddName.value;
  const newCardLink = popupCardAddLink.value;
  initialCards.unshift({name: newCardName, link: newCardLink});
  renderCards();
}

//сохранение попапа добавления карточек
const popupCardAddSaveForm = (event) => {
  event.preventDefault();
  addNewCard();
  popupOpenClose(popupCardAdd);
}







//открытие всех попапов
const popupOpenClose = (popup) => {
  popup.classList.toggle('popup_opened');
};

/*
//открытие всех попапов
const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
};

//закрытие всех попапаов
const popupClose = (popup) => {
  popup.classList.remove('popup_opened');
};
 */

//popup profile-edit загрузка текста в попап редактирования профиля
  const loadProfileInfo = () => {
    popupProfileEditTxtName.value = profileEditTxtName.textContent.trim();
    popupProfileEditTxtAbout.value = profileEditTxtAbout.textContent.trim();
}

//popup profile-edit передача текста из попапа редактирования профиля
  const saveProfileInfo = () => {
    profileEditTxtName.textContent = popupProfileEditTxtName.value;
    profileEditTxtAbout.textContent = popupProfileEditTxtAbout.value;
}


//сохранение попапа редактирования профиля
  const popupProfileEditSaveForm = (event) => {
    event.preventDefault();
    saveProfileInfo();
    popupOpenClose(popupProfileEdit);
}







//profile-edit buttons events
profileEditButtonOpen.addEventListener('click', () => {
    loadProfileInfo();
    popupOpenClose(popupProfileEdit);
    }
);
popupProfileEditButtonClose.addEventListener('click', () => {
  popupOpenClose(popupProfileEdit);
    }
);
popupProfileEditForm.addEventListener('submit', popupProfileEditSaveForm);



//card-add buttons events
profileCardAddOpen.addEventListener('click', () => {
  popupCardAddName.value = "";
  popupCardAddLink.value = "";
  popupOpenClose(popupCardAdd)
    }
);
popupCardAddButtonClose.addEventListener('click', () => {
  popupOpenClose(popupCardAdd);
    }
);
popupCardAddForm.addEventListener('submit', popupCardAddSaveForm);





renderCards();

