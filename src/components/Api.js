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
          method: 'GET',
          headers: this._headers,
        })
        .then (this._checkServerResponse);
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
          body: JSON.stringify(avatarData),
        })
        .then (this._checkServerResponse);
      }

      // Card Methods

      getInitialCards() {
        // ...
      }
  }
  
