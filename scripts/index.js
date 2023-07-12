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

const profilePencilBtn = document.querySelector("#profile-pencil-btn");
const profilePencilModal = document.querySelector("#profile-pencil-modal");
const profileCloseModal = document.querySelector("#profile-modal-close-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileModalForm = profilePencilModal.querySelector(".modal__form");
const cardContentElement = document.querySelector(".cards__content");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const profileAddBtn = document.querySelector("#profile-add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseModal = document.querySelector("#add-card-close-btn");
const addCardTitleInput = document.querySelector("#card-title-input");
const addCardImageLinkInput = document.querySelector("#card-image-link-input");
const addCardModalForm = addCardModal.querySelector(".modal__form");
const cardItem = document.querySelector(".card") 

/* Functions */

function closeModal() {
  profilePencilModal.classList.remove("modal_opened");
} 

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeBtnElement = cardElement.querySelector(".card__like-button");
  const cardDeleteBtnElement = cardElement.querySelector(".card__delete-button");

  cardLikeBtnElement.addEventListener('click', handleLikeButtonClick);
  cardDeleteBtnElement.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

function closeAddCardModal() {
  addCardModal.classList.remove("modal_opened");
}

/* Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

function handleAddNewCardSubmit(e) {
  e.preventDefault();
  const newCard = {
    name: addCardTitleInput.value,
    link: addCardImageLinkInput.value,
  };
  const cardElement = getCardElement(newCard);
  cardContentElement.prepend(cardElement);
  closeAddCardModal();
  addCardTitleInput.value = "";
  addCardImageLinkInput.value = "";
}

function handleLikeButtonClick(e) {
  const cardLikeBtn = e.target;
  cardLikeBtn.classList.toggle("card__like-button_active");
}

/* Event Listeners */

profilePencilBtn.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profilePencilModal.classList.add("modal_opened");
});

profileCloseModal.addEventListener('click', closeModal);

profileModalForm.addEventListener('submit', handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardContentElement.append(cardElement);
});

profileAddBtn.addEventListener('click', () => {
  addCardModal.classList.add("modal_opened");
});

addCardCloseModal.addEventListener('click', closeAddCardModal);

addCardModal.addEventListener('submit', handleAddNewCardSubmit);