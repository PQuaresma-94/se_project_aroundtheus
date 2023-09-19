export default class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener('mousedown', () => this._handleLikeButtonClick());
        this._element.querySelector(".card__delete-button").addEventListener('mousedown', () => this._handleDeleteCard());
        this._element.querySelector(".card__image").addEventListener('mousedown', () => this._handlePreviewPicture());
    }

    _handleLikeButtonClick() {
        this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
    }

    _handleDeleteCard(e) {
        this._element.remove();
    }

    _handlePreviewPicture() {
        this._handleCardClick(this._link, this._name);
    }

    getView() {
        this._element = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        this._setEventListeners();

        return this._element;
    }


}