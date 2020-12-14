export default class Card {
  constructor(item, cardSelector, popupImageViewOpen) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._popupImageViewOpen = popupImageViewOpen;
  }

//берем template карточки
  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._newCard = card;
  }

//like-переключатель активности класса
  _cardButtonLikeHandler() {
    this._newCard.querySelector('.card__like-button')
        .classList.toggle('card__like-button_active');
  }

//кнопка удаления карточки
  _cardButtonRemoveHandler() {
    this._newCard.querySelector('.card__remove-button')
    .closest('.card').remove();
  }


//навешиваем слушатели событий
  _setEventListeners() {
//like
    this._newCard.querySelector('.card__like-button')
        .addEventListener('click', () => {
          this._cardButtonLikeHandler();
        });
//remove
    this._newCard.querySelector('.card__remove-button')
      .addEventListener('click', () => {
        this._cardButtonRemoveHandler();
      });
//ImageView
    this._newCard.querySelector('.card__image-button')
        .addEventListener('click', (event) => {
          event.target.closest('.card__image');  //проверить
            this._popupImageViewOpen(this._name, this._link);
    });
  }

//публичный метод создания карточки
  createCards() {
    this._getTemplate();
      this._setEventListeners();
      const cardImage = this._newCard.querySelector('.card__image');
            cardImage.src = this._link;
            cardImage.alt = this._name;
      const cardTitle = this._newCard.querySelector('.card__title');
            cardTitle.textContent = this._name;
    return this._newCard
  }
}
