import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

/* Elements */

// Profile Elements

const profilePencilBtn = document.querySelector("#profile-pencil-btn");
const profilePencilModal = document.querySelector("#profile-pencil-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");

// Add Card Elements

const profileAddBtn = document.querySelector("#profile-add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const addCardTitleInput = document.querySelector("#card-title-input");
const addCardImageLinkInput = document.querySelector("#card-image-link-input");


// Popup Image Preview

const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

function handleCardClick(link, name) {
  imagePopup.open({link, name});
}

// Add Card Modal Event Handler

function handleAddNewCardSubmit() {
  const newCard = {
    name: addCardTitleInput.value,
    link: addCardImageLinkInput.value,
  };
  const cardElementData = new Card(newCard, "#card-template", handleCardClick);
  const cardElement = cardElementData.getView();
  cardSection.addItem(cardElement);
  addCardFormValidator.disableBtn();
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

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Render Initial Cards from Section class
const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const initialCardData = new Card(cardData, "#card-template", handleCardClick);
    const cardElement = initialCardData.getView();
    cardSection.addItem(cardElement);
  }
}, '.cards__content');

cardSection.renderItems();

// UserInfo 

const userInfo = new UserInfo({
  title: '.profile__title',
  description: '.profile__description'
});

// Edit Profile Form 

const profileEditPopup = new PopupWithForm('#profile-pencil-modal', (formData) => {
   userInfo.setUserInfo(formData);
});

profileEditPopup.setEventListeners();

profilePencilBtn.addEventListener('mousedown', () => {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value =  profileInfo.title;
  profileDescriptionInput.value = profileInfo.description;
  editFormValidator.resetErrorMessage();
  editFormValidator.disableBtn();
  profileEditPopup.open();
});

// Add New Card Form 

const addNewCardPopup = new PopupWithForm('#add-card-modal', () => {
  handleAddNewCardSubmit();
});

addNewCardPopup.setEventListeners();

profileAddBtn.addEventListener('mousedown', () => {
  addCardFormValidator.resetErrorMessage();
  addNewCardPopup.open();
});
