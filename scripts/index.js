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


const profileTxtName = document.querySelector('.profile__title');
const profileTxtAbout = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup');
const popupEditButtonOpen = document.querySelector('.profile__edit-button');
const popupEditButtonClose = popupEdit.querySelector('.popup__close-button');
const popupForm = popupEdit.querySelector('.popup__profile-form');
const popupTxtName = popupEdit.querySelector('.popup__input_txt_name');
const popupTxtAbout = popupEdit.querySelector('.popup__input_txt_about');




//создание "изначальных" карточек из массива
const originalCards = ({name, link}) => {
  const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardsContainer.appendChild(cardElement);
}


const createCards = () => {
  cardsContainer.innerHTML = "";
  initialCards.forEach(originalCards);
}

createCards();




//загрузка текста в попап редактирования профиля
const loadProfileInfo = () => {
  popupTxtName.value = profileTxtName.textContent.trim();
  popupTxtAbout.value = profileTxtAbout.textContent.trim();
}

//передача текста из попапа редактирования профиля
const saveProfileInfo = () => {
  profileTxtName.textContent = popupTxtName.value;
  profileTxtAbout.textContent = popupTxtAbout.value;
}

//открытие попапа редактирования профиля профиля
const popupOpen = () => {
  loadProfileInfo();
  popupEdit.classList.add('popup_opened');
};

//закрытие попапа редактирования профиля
const popupClose = () => {
  popupEdit.classList.remove('popup_opened');
};

//сохранение попапа редактирования профиля
const popupSaveForm = (event) => {
  event.preventDefault();
  saveProfileInfo();
  popupClose();
}

popupEditButtonOpen.addEventListener('click', popupOpen);
popupEditButtonClose.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSaveForm);

