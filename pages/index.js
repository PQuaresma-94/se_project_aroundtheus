import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import {openModal, closeModal, handleProfileEditSubmit, handleAddNewCardSubmit} from "../utils/utils.js"

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
const profileCloseModal = document.querySelector("#profile-modal-close-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileModalForm = profilePencilModal.querySelector(".modal__form");

// Add Card Elements

const cardContentElement = document.querySelector(".cards__content");
const profileAddBtn = document.querySelector("#profile-add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseModal = document.querySelector("#add-card-close-btn");

// Preview Image Elements

const previewImageModal = document.querySelector("#preview-image-modal");
const previewCloseBtn = document.querySelector("#preview-image-close-btn");

/* Event Listeners */

// Profile Pencil Modal Event Listeners

profilePencilBtn.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePencilModal);
});

profileCloseModal.addEventListener('click', () => closeModal(profilePencilModal));

profileModalForm.addEventListener('submit', handleProfileEditSubmit);

profilePencilModal.addEventListener("click", (e) => {
  if (e.target === profilePencilModal) {
    closeModal(profilePencilModal);
  };
})

// Add Card Modal Event Listeners

profileAddBtn.addEventListener('click', () => {
  openModal(addCardModal);
});

addCardCloseModal.addEventListener('click', () => closeModal(addCardModal));

addCardModal.addEventListener("click", (e) => {
  if (e.target === addCardModal) {
    closeModal(addCardModal);
  };
})

addCardModal.addEventListener('submit', handleAddNewCardSubmit);

// Preview Image Event Listeners

previewCloseBtn.addEventListener('click', () => closeModal(previewImageModal));

previewImageModal.addEventListener("click", (e) => {
  if (e.target === previewImageModal) {
    closeModal(previewImageModal);
  };
})


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
export const addCardFormValidator = new FormValidator(defautlFormConfig, addCardModal);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Render Initial Cards

function renderCard () {
  initialCards.forEach((cardData) => {
  const initialCardData = new Card(cardData, "#card-template");
  const cardElement = initialCardData.getView();
  cardContentElement.append(cardElement)
  })
}

renderCard();