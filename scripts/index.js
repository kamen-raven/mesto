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

//создание "изначальных" карточек из массива
  const createCards = ({name, link}) => {
    const cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.card__image').src = link;
      cardElement.querySelector('.card__image').alt = name;
      cardElement.querySelector('.card__title').textContent = name;
      cardsContainer.append(cardElement);
}

//отрисовка "изначальных" карточек из массива
  const renderCards = () => {
/*   cardsContainer.innerHTML = ""; */
    initialCards.forEach(createCards);
}


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

//popup profile-edit открытие попапа редактирования профиля профиля
  const popupOpen = (popup) => {
    popup.classList.add('popup_opened');
};


//закрытие всех попапаов
  const popupClose = (popup) => {
    popup.classList.remove('popup_opened');
};

//сохранение попапа редактирования профиля
  const popupProfileEditSaveForm = (event) => {
    event.preventDefault();
    saveProfileInfo();
    popupClose(popupProfileEdit);
}

//сохранение попапа редактирования профиля
const popupCardAddSaveForm = (event) => {
  event.preventDefault();

  popupClose(popupCardAdd);
}





//profile-edit buttons events
  profileEditButtonOpen.addEventListener('click', () => {
    loadProfileInfo();
    popupOpen(popupProfileEdit);
    }
);

  popupProfileEditButtonClose.addEventListener('click', () => {
    popupClose(popupProfileEdit);
    }
);

  popupProfileEditForm.addEventListener('submit', popupProfileEditSaveForm);



//card-add buttons events
  profileCardAddOpen.addEventListener('click', () => {
    
    popupOpen(popupCardAdd)
    }
);

  popupCardAddButtonClose.addEventListener('click', () => {
    popupClose(popupCardAdd);
    }
);

popupCardAddForm.addEventListener('submit', popupCardAddSaveForm);



  renderCards();
