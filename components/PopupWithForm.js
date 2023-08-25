import Popup from "./Popup.js"

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmiit = handleFormSubmit;
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    open() {

    }
}