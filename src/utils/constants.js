//card-template
export const templateCards = document.querySelector('.template-cards');

//cards
export const cardsContainer = document.querySelector('.cards');

//profile
//profile info content
//нашли форму  profileInfo по ее имени (name) - profileInfo
export const profileInfoForm = document.forms.profileInfo;
export const profileTxtName = document.querySelector('.profile__title');
export const profileTxtAbout = document.querySelector('.profile__subtitle');
//profile buttons
export const profileEditButtonOpen = document.querySelector('.profile__edit-button');
export const cardAddOpen = document.querySelector('.profile__add-button');

//popup profile-edit
export const popupProfileEdit = document.querySelector('.popup_profile-edit');
export const popupProfileForm = popupProfileEdit.querySelector('.popup__form_profile-edit');
export const popupProfileTxtName = popupProfileEdit.querySelector('.popup__input_profile-edit_name');
export const popupProfileTxtAbout = popupProfileEdit.querySelector('.popup__input_profile-edit_about');
//popup add-card
//нашли форму  popupCardAdd по ее имени (name) - addNewCardForm
export const addNewCardForm = document.forms.addNewCardForm;

export const popupCardAdd = document.querySelector('.popup_card-add');
export const popupCardAddForm = popupCardAdd.querySelector('.popup__form_card-add');
export const popupCardAddName = popupCardAdd.querySelector('.popup__input_card-add_name');
export const popupCardAddLink = popupCardAdd.querySelector('.popup__input_card-add_link');
//popup image-view
export const popupImageView = document.querySelector('.popup_image-view');
