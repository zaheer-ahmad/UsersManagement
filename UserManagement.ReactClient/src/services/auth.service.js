import conf from "../conf/conf";
import { TokenService } from "./token.service";
import axios from "axios";

export class AuthService {
  tokenService = null;
  constructor() {
    this.tokenService = new TokenService();
  }
  async login(login) {
    const response = await axios.post(`${conf.baseUrl}${conf.loginUrl}`, login);
    if (response && response.data.token) {
      this.tokenService.setToken(response.data.token);
    }
    return response;
  }
  logout() {
    this.tokenService.removeToken();
  }
  isLoggedIn() {
    const token = this.tokenService.getToken();
    return token !== null && !this.tokenService.isTokenExpired(token);
  }
  getRole() {
    const decodedToken = this.tokenService.decodeToken();
    return decodedToken ? decodedToken.role : null;
  }
  hasRole(role) {
    const decodedToken = this.tokenService.decodeToken();
    return decodedToken ? decodedToken.role == role : false;
  }
  getUserName() {
    const decodedToken = this.tokenService.decodeToken();
    return decodedToken ? decodedToken.unique_name : null;
  }
}
