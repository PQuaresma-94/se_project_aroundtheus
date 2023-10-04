export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
   }
  
    // User Methods

    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(res => res.json())
        .then((result) => {
            return result;
        })
        .catch((err) => {console.log(err)})
      }
    
      updateProfile(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: profileData.title,
            about: profileData.description,
          }),
        }).then((response) => response.json());
      }
    
      updateAvatar(avatarData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(avatarData),
        }).then((response) => response.json());
      }

      // Card Methods

      getInitialCards() {
        // ...
      }
  }
  
