import { jwtDecode } from "jwt-decode";
export class TokenService {
  tokenKey = "authToken";
  constructor() {}

  setToken(token) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  removeToken() {
    sessionStorage.removeItem(this.tokenKey);
  }
  isTokenExpired() {
    let decodedToken = this.decodeToken();
    return decodedToken != null
      ? decodedToken.exp * 1000 < new Date().getTime()
      : true;
  }
  decodeToken() {
    let token = this.getToken();
    return token != null ? jwtDecode(token) : null;
  }
}
