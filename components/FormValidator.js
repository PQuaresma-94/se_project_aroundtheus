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

_disableBtn(saveButton) {
    saveButton.classList.add(this._inactiveButtonClass);
    saveButton.disabled = true;
}

_enableBtn(saveButton) {
    saveButton.classList.remove(this._inactiveButtonClass);
    saveButton.disabled = false;
}

_toggleButtonState(inputEls, saveButton) {
    if (this._hasInvalidInput(inputEls)) {
        this._disableBtn(saveButton)
        return;
    } 
    this._enableBtn(saveButton);
}

_setEventListeners() {
    const inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    const saveButton = this._formEl.querySelector(this._submitButtonSelector)

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            this._checkInputValidity(inputEl)
            this._toggleButtonState(inputEls, saveButton);
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


//config needs to be the modal while the form element needs to be the form inside the modal
// See if Save button needs to be remove as an argument in _toggleButtonState, _disableBtn and _enableBtn