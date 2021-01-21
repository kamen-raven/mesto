export default class UserInfo {
  constructor(profileName, profileAbout) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    return {
      name: this._name.textContent.trim(),
      about: this._about.textContent.trim()
    }
  }

  getUserId(id){
    console.log(id);
    return id;
  }

  setUserInfo(newProfileName, newProfileAbout) {
    this._name.textContent = newProfileName;
    this._about.textContent = newProfileAbout;
  }
}
