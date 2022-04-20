import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());  
    }

    // check if user is still logged in
    loggedIn() {
        // Checks if there is a saved token and its still good
        const token = this.getToken();
        // use type corersion to check if token is NOT undefined and that it is not expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieves token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localstorage and reload page to homepage
    login(idToken) {
        // Saves user token to localstorage
        localStorage.setItem('id_token',idToken);

        window.location.assign('/');
    }

    // clear token from localstorage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
};

export default new AuthService();