import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._submitButton = this._popupElement.querySelector(".modal__save-button");
        this._submitButtonText = this._submitButton.textContent;
    }

    setConfirmationCallback(callback) {
        this._handleConfirmationSubmit = callback;
    }
    
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleConfirmationSubmit();
        });
    }

    setSubmitButtonState(submit, buttonText = "Deleting...") {
        if (submit) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    } 
} 