export default class Card {
  constructor({ data, handleClickImage }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleClickImage = () => handleClickImage(this._name, this._link);
    this._handleDeleteCard = this._cardButtonRemoveHandler.bind(this);
  }

  //берем template карточки
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  //like-переключатель активности класса
  _cardButtonLikeHandler(event) {
    event.target.classList.toggle('card__like-button_active');
  }


  //кнопка удаления карточки
  _cardButtonRemoveHandler() {
    this._newCard.remove();
    this._newCard = null;
  }

  //навешиваем слушатели событийнн
  _setEventListeners() {
    this._newCard.querySelector('.card__like-button').addEventListener('click', this._cardButtonLikeHandler);
    this._newCard.querySelector('.card__image-button').addEventListener('click', this._handleClickImage);
    this._newCard.querySelector('.card__remove-button').addEventListener('click', this._handleDeleteCard);
  }

  //публичный метод создания карточки
  createCards() {
    this._newCard = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._newCard.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    const cardTitle = this._newCard.querySelector('.card__title');
    cardTitle.textContent = this._name;
    return this._newCard
  }
}
