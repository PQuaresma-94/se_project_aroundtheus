import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
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
            this.close();
        });
        this._popupElement.querySelector(".modal__close-button").addEventListener('mousedown', () => {
            this.close();
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
} 