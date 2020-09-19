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
const popupButtonClose = document.querySelector('.popup__close-button');
//popup profile-edit
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__form_profile-edit');
const popupProfileEditTxtName = popupProfileEdit.querySelector('.popup__input_profile-edit_name');
const popupProfileEditTxtAbout = popupProfileEdit.querySelector('.popup__input_profile-edit_about');
//popup add-card
const popupCardAdd = document.querySelector('.popup_card-add');
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
const popupProfileEditOpen = () => {
  loadProfileInfo();
  popupProfileEdit.classList.add('popup_opened');
};

//закрытие всех попапаов
const popupClose = () => {
  popup.classList.remove('popup_opened');
};

//сохранение попапа редактирования профиля
const popupSaveForm = (event) => {
  event.preventDefault();
  saveProfileInfo();
  popupClose();
}

profileEditButtonOpen.addEventListener('click', popupProfileEditOpen);
popupButtonClose.addEventListener('click', popupClose);
popupProfileEditForm.addEventListener('submit', popupSaveForm);
renderCards();
