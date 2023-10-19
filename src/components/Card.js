export default class Card {
    constructor(cardData, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._id = cardData._id;
        this._isLiked = cardData.isLiked;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener('mousedown', () => this._handleLikeClick(this));
        this._element.querySelector(".card__delete-button").addEventListener('mousedown', () => this._handleDeleteCard(this));
        this._element.querySelector(".card__image").addEventListener('mousedown', () => this._handlePreviewPicture());
    }

    _handleLikeButton() {
         if (this._isLiked) {
            this._element.querySelector(".card__like-button").classList.add("card__like-button_active")
        } else {
            this._element.querySelector(".card__like-button").classList.remove("card__like-button_active")
        };
    }

    isLiked() {
        return this._isLiked;
    }

    setCardLike(isLiked) {
        this._isLiked = isLiked
        this._handleLikeButton();
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

        this._handleLikeButton();

        this._setEventListeners();

        return this._element;
    }
}