const profileTxtName = document.querySelector('.profile__title');
const profileTxtAbout = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup');
const popupEditButtonOpen = document.querySelector('.profile__edit-button');
const popupEditButtonClose = popupEdit.querySelector('.popup__close-button');
const popupForm = popupEdit.querySelector('.popup__profile-form');
const popupTxtName = popupEdit.querySelector('.popup__input_txt_name');
const popupTxtAbout = popupEdit.querySelector('.popup__input_txt_about');


const loadProfileInfo = function () {
  popupTxtName.value = profileTxtName.textContent.trim();
  popupTxtAbout.value = profileTxtAbout.textContent.trim();
}

const saveProfileInfo = function () {
  profileTxtName.textContent = popupTxtName.value;
  profileTxtAbout.textContent = popupTxtAbout.value;
}

const popupOpen = function () {
  loadProfileInfo();
  popupEdit.classList.add('popup_opened');
};

const popupClose = function () {
  popupEdit.classList.remove('popup_opened');
};

const popupSaveForm = function () {
  event.preventDefault();
  saveProfileInfo();
  popupClose();
}

popupEditButtonOpen.addEventListener('click', popupOpen);
popupEditButtonClose.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSaveForm);
