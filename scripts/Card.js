class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    this._newCard = card;
  }


  _cardButtonLikeHandler(event) {
      event.target.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    const cardButtonLike = this._newCard.querySelector('.card__like-button');
      cardButtonLike.addEventListener('click', () => {
        this._cardButtonLikeHandler();
    });

    const buttonImage = this._newCard.querySelector('.card__image-button');
        buttonImage.addEventListener('click', (event) => {
          const img = event.target.closest('.card__image');
            popupImageViewBigImage.src = img.src;
            popupImageViewBigImage.alt = img.alt;
            popupImageViewCaption.textContent = img.alt;
              popupOpen(popupImageView);
    });

  }





  createCards() {
    this._getTemplate();
/*     this._setEventListeners(); */
      const cardImage = this._newCard.querySelector('.card__image');
            cardImage.src = this._link;
            cardImage.alt = this.name;
      const cardTitle = this._newCard.querySelector('.card__title');
            cardTitle.textContent = this.name;
    return this._newCard
  }

}

/*
  _setEventListeners() {
    this._element.querySelector('.card__text').addEventListener('click', () => {
      this._handleMessageClick();
    });
  }

  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }
}

messageList.forEach((item) => {
  const card = new Card(item, '.card-template_type_default');
  const cardElement = card.generateCard();

  document.body.append(cardElement);
}); */


const renderElements = () => {
  initialCards.forEach((item) => {
  const card = new Card(item, '.template-cards');
  const cardElement = card.createCards();

  cardsContainer.append(cardElement);
}
 );
}
