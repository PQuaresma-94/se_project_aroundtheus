function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        return showInputError(formEl, inputEl, options);
    }

        hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid)
}

function disableBtn(saveButton, {inactiveButtonClass}) {
    saveButton.classList.add(inactiveButtonClass);
    saveButton.disabled = true;
}

function enableBtn(saveButton, {inactiveButtonClass}) {
    saveButton.classList.remove(inactiveButtonClass);
    saveButton.disabled = false;
}

function toggleButtonState(inputEls, saveButton, {inactiveButtonClass}) {
    if (hasInvalidInput(inputEls)) {
        disableBtn(saveButton, {inactiveButtonClass})
        return;
    } 
    enableBtn(saveButton, {inactiveButtonClass});
}

function setEventListeners(formEl, options) {
    const {inputSelector, submitButtonSelector} = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const saveButton = formEl.querySelector(submitButtonSelector)
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            checkInputValidity(formEl, inputEl, options)
            toggleButtonState(inputEls, saveButton, options);
        });
    });
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit",(e) => {
            e.preventDefault();
        });
        setEventListeners(formEl, options);
    });
}

const config = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__error_visible"
  }

enableValidation(config);