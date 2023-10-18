export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
   }

   // Check Response

   _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Error: ${res.status}`);
   } 
  
    // User Methods

    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        })
        .then (this._checkServerResponse)
        .then((result) => {
          console.log(result);
        }); 
      }
    
      updateProfile(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: profileData.title,
            about: profileData.description,
          }),
        })
        .then (this._checkServerResponse);
      }
    
      updateAvatar(avatarData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({avatar: avatarData.link}),
        })
        .then (this._checkServerResponse);
      }

      // Card Methods

      getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        })
        .then (this._checkServerResponse)
        .then((result) => {
          console.log(result);
        }); 
      }

      // Create and Delete Cards

      addCard({title, link}) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: title,
            link: link,
          })
        })
        .then (this._checkServerResponse);
      }

      deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then (this._checkServerResponse);
      }

      // Like Cards Functionality

      likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
        .then (this._checkServerResponse);
      }

      dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then (this._checkServerResponse);
      }
  }
  
