export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._name = profileName;
    this._about = profileAbout;
    this._avatar = profileAvatar;
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

  //метод для редактирования аватара
  setNewAvatar(newProfileAvatar) {
    this._avatar.src = newProfileAvatar;
  }
}

