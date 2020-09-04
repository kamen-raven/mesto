const profileTxtName = document.querySelector('.profile__title');
const profileTxtAbout = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup');
const popupEditButtonOpen = document.querySelector('.profile__edit-button');
const popupEditButtonClose = popupEdit.querySelector('.popup__close-button');
const popupForm = popupEdit.querySelector('.popup__profile-form');
const popupTxtName = popupEdit.querySelector('.popup__input_txt_name');
const popupTxtAbout = popupEdit.querySelector('.popup__input_txt_about');


// 1. Открытие и закрытие попапа

const popupOpen = function (event) {
    console.log('Event: ', event);
    loadProfileInfo();
    popupEdit.classList.add('popup_opened');
};

popupEditButtonOpen.addEventListener('click', popupOpen);

const popupClose = function (event) {
    console.log('Event: ', event);
    popupEdit.classList.remove('popup_opened');
};

  popupEditButtonClose.addEventListener('click', popupClose);


// 2. Поля формы

const loadProfileInfo = function () {
  popupTxtName.value = profileTxtName.textContent.trim();
  popupTxtAbout.value = profileTxtAbout.textContent.trim();
  console.log(popupTxtName.value, popupTxtAbout.value)
}

const saveProfileInfo = function () {
  profileTxtName.textContent = popupTxtName.value;
  profileTxtAbout.textContent = popupTxtAbout.value;
}


// 3. Редактирование имени и информации о себе

const popupSaveForm = function (event) {
  event.preventDefault();
  saveProfileInfo();
  popupEdit.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', popupSaveForm);
