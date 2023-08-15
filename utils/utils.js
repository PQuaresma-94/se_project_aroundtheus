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

export {openModal, closeModal};
