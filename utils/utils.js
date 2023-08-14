import Card from "../components/Card.js"

/* Elements */

// Card Form Validator Button Element

import {addCardFormValidator} from  "../pages/index.js"

// Profile Elements

const profilePencilModal = document.querySelector("#profile-pencil-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");

// Add Card Elements

const cardContentElement = document.querySelector(".cards__content");
const addCardModal = document.querySelector("#add-card-modal");
const addCardTitleInput = document.querySelector("#card-title-input");
const addCardImageLinkInput = document.querySelector("#card-image-link-input");
const addCardSaveBtn = document.querySelector("#add-card-save-btn");
const addCardModalForm = addCardModal.querySelector(".modal__form");

/* Functions */

// Open Modal Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', closeByEscape);
}

// Close Modal Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  };
} 

/* Event Handlers */

// Profile Pencil Modal Event Handler

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profilePencilModal);
}

// Add Card Modal Event Handler

function handleAddNewCardSubmit(e) {
  e.preventDefault();
  const newCard = {
    name: addCardTitleInput.value,
    link: addCardImageLinkInput.value,
  };
  const cardElementData = new Card(newCard, "#card-template");
  const cardElement = cardElementData.getView();
  cardContentElement.prepend(cardElement);
  closeModal(addCardModal);
  addCardModalForm.reset();
  addCardFormValidator.disableBtn(addCardSaveBtn);
}

export {openModal, closeModal, handleProfileEditSubmit, handleAddNewCardSubmit};
