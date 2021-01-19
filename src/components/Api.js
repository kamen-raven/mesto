export default class Api {
  constructor({ address, token, cohortId }) {
    this._address = address;
    this._token = token;
    this._cohortId = cohortId;
  }

  //--------запросы к данным пользователя
  //запрос данных пользователя
  getUserData() {
    return fetch(`${this._address}/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Хьюстон, у нас проблема: ${res.status}`)
  })
  }

  //запрос на обновление данных пользователя

  //запрос на обновление аватара пользователя


  //---------запросы к карточкам
  //запрос массива карточек
  getInitialCards() {
    return fetch(`${this._address}/v1/${this._cohortId}/cards `, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
  })
  }

  //запрос добавления новой карточки

  //запрос на удаление карточки



  //-----запросы к лайкам карточек
  //запрос на постановку лайка карточки

  //запрос на удаление лайка карточки

}

/*
fetch('https://mesto.nomoreparties.co/v1/cohort-19/', {
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
 */
