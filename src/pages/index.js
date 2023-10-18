import {initialCards} from "../utils/constants.js"
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

/* Elements */

// Profile Elements

const profilePencilBtn = document.querySelector("#profile-pencil-btn");
const profilePencilModal = document.querySelector("#profile-pencil-modal");
const profileAvatarModal = document.querySelector("#profile-avatar-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileAvatarImage = document.querySelector(".profile__image")
const profileAvatarEditBtn = document.querySelector("#profile-image-pencil-btn");

// Add Card Elements

const profileAddBtn = document.querySelector("#profile-add-btn");
const addCardModal = document.querySelector("#add-card-modal");

// Api Class

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5ed97d95-558f-499d-9d81-4e06bbe8932c",
    "Content-Type": "application/json"
  }
}); 

api.getCurrentUser();

// Update Avtar Function 

function updateAvatar(newAvatar) {
  profileAvatarImage.src = newAvatar
};

// Popup Image Preview

const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

function handleCardClick(link, name) {
  imagePopup.open({link, name});
}

// Create Card Function

function createCard(cardData) {
  const cardElementData = new Card(cardData, "#card-template", handleCardClick);
  return cardElementData.getView();
}

// Add Card Modal Event Handler

function handleAddNewCardSubmit(newCardData) {
  const cardElement = createCard(newCardData);
  cardSection.addItem(cardElement);
}

// Validation Activation

const defautlFormConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__error_visible"
}

const editFormValidator = new FormValidator(defautlFormConfig, profilePencilModal);
const addCardFormValidator = new FormValidator(defautlFormConfig, addCardModal);
const editAvatarFormValidator = new FormValidator(defautlFormConfig, profileAvatarModal);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

// Render Initial Cards from Section class
const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
     const cardElement = createCard(cardData);
    cardSection.addItem(cardElement);
  }
}, '.cards__content');

cardSection.renderItems();

// UserInfo 

const userInfo = new UserInfo({
  title: '.profile__title',
  description: '.profile__description',
  avatar: '.profile__image'
});

// Edit Profile Form 

const profileEditPopup = new PopupWithForm('#profile-pencil-modal', (formData) => {
   userInfo.setUserInfo(formData);
});

profileEditPopup.setEventListeners();

profilePencilBtn.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value =  profileInfo.title;
  profileDescriptionInput.value = profileInfo.description;
  editFormValidator.resetErrorMessage();
  editFormValidator.disableBtn();
  profileEditPopup.open();
});

// Edit Avatar Form

const profileAvatarPopup = new PopupWithForm('#profile-avatar-modal', (formData) => {
  updateAvatar(formData);
});

profileAvatarPopup.setEventListeners();

profileAvatarEditBtn.addEventListener('click', () => {
  editAvatarFormValidator.resetErrorMessage();
  editAvatarFormValidator.disableBtn();
  profileAvatarPopup.open();
})

// Add New Card Form 

const addNewCardPopup = new PopupWithForm('#add-card-modal', (newCardData) => {
  handleAddNewCardSubmit(newCardData);
});

addNewCardPopup.setEventListeners();

profileAddBtn.addEventListener('click', () => {
  addCardFormValidator.resetErrorMessage();
  addCardFormValidator.disableBtn();
  addNewCardPopup.open();
});

// Delete Confirmation Card Form (need to fix console error of undefined from event listeners)

// const deleteConfirmationCardPopup = new PopupWithForm('#card-confirmation-modal');

// deleteConfirmationCardPopup.setEventListeners();