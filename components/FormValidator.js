export default class FormValidator {

    constructor(config, formEl) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formEl = formEl;

}

_showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
}

_hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
}

_checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
        return this._showInputError(inputEl);
    }

    this._hideInputError(inputEl);
}

_hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid)
}

disableBtn() {
    this._formEl.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    this._formEl.querySelector(this._submitButtonSelector).disabled = true;
}

_enableBtn() {
    this._formEl.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
    this._formEl.querySelector(this._submitButtonSelector).disabled = false;
}

_toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
        this.disableBtn()
        return;
    } 
    this._enableBtn();
}

_setEventListeners() {
    const inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            this._checkInputValidity(inputEl)
            this._toggleButtonState(inputEls);
        });
    });
}

enableValidation() {
    this._formEl.addEventListener("submit",(e) => {
        e.preventDefault();
    });
    this._setEventListeners();
}

}
