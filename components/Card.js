const previewImageModal = document.querySelector("#preview-image-modal");
const previewCardImage = previewImageModal.querySelector(".modal__preview-image");
const previewCardImageTitle = previewImageModal.querySelector(".modal__preview-image-title");

import {openModal} from "../utils/utils.js"

export default class Card {
    constructor(cardData, cardSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
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
        openModal(previewImageModal);
        previewCardImage.src = this._link;
        previewCardImage.alt = this._name;
        previewCardImageTitle.textContent = this._name;
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