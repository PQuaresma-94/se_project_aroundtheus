export class Popup {
    constructor({popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        this._popupElement.classList.add("modal_opened");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        if (e.key === "Escape") {
            this.close();
          };
    }

    setEventListeners() {
        this._popupElement.querySelector(".modal__close-button").addEventListener('mousedown', () => {
            this.close();
        });

        this._popupElement.addEventListener('mousedown', (e) => {
            if (e.target === this._popup) {
              this.close();
            }
          });
    }
}