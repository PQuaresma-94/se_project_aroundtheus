import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popupElement.querySelector(".modal__save-button");
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        const inputList = this._popupForm.querySelectorAll('.form__input');
        const values = {};
        inputList.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    setSubmitButtonState(submit, buttonText = "Saving...") {
        if (submit) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    } 
} 