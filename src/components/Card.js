export default class Card {
  constructor(data, curretUserId, { handleClickImage, handleClickLike, handleClickDelete }, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._curretUserId = curretUserId;
    this._templateElement = templateElement;
    this._newCard = this._getTemplate();
    this._likeButton = this._newCard.querySelector('.card__like-button');
    this._cardLikeCounter = this._newCard.querySelector('.card__like-counter');
    this._imageButton = this._newCard.querySelector('.card__image-button');
    this._removeButton = this._newCard.querySelector('.card__remove-button');
    this._cardImage = this._newCard.querySelector('.card__image');
    this._cardTitle = this._newCard.querySelector('.card__title');
    this._handleClickImage = () => handleClickImage(this._name, this._link);
    this._handleClickLike = () => handleClickLike(this._cardId, this._isLiked());
    this._handleClickDelete = () => handleClickDelete(this._cardId);
  }

  //берем template карточки
  _getTemplate() {
    return this._templateElement
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _checkOwnerCard() {
    if (this._curretUserId != this._ownerId) {
      this._removeButton.remove()
    }
  }

  //навешиваем слушатели событийнн
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleClickLike);
    this._imageButton.addEventListener('click', this._handleClickImage);
    this._removeButton.addEventListener('click', this._handleClickDelete);
  }

  _isLiked() {
    return this._likeButton.classList.contains('card__like-button_active');
  }

  //метод отображения количества лайков у карточки
  setLikes(arrayLikes) {
    this._likes = arrayLikes;
    //отображаем количество лайков на странице
    this._cardLikeCounter.textContent = this._likes.length;
    //проверяем, есть ли лайки пользователя
    const myLike = this._likes.some((like) => {
      const likeId = like._id;
      return likeId === this._curretUserId;
    });
    //устанавливаем отображение лайков, в зависимости от проверки
    if (myLike) {
      this._likeButton.classList.add('card__like-button_active')
    } else {
      this._likeButton.classList.remove('card__like-button_active')
    }
  }

  //кнопка удаления карточки
  removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  //публичный метод создания карточки
  createCards() {
    this._setEventListeners();
    this._checkOwnerCard();
    this.setLikes(this._likes);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._newCard
  }
}
