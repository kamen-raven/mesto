export default class UserInfo {
  constructor( profileName, profileAbout) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    return {
      name: this._name.textContent.trim(),
      about: this._about.textContent.trim()
    }
  }

  setUserInfo(newProfileName, newProfileAbout) {
    this._name.textContent = newProfileName;
    this._about.textContent = newProfileAbout;
  }
}


/* export const profileEditTxtName = document.querySelector('.profile__title');
export const profileEditTxtAbout = document.querySelector('.profile__subtitle');


export const popupProfileEditTxtName = popupProfileEdit.querySelector('.popup__input_profile-edit_name');
export const popupProfileEditTxtAbout = popupProfileEdit.querySelector('.popup__input_profile-edit_about');
 */
