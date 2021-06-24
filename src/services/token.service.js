import jwtDecode from "jwt-decode";

export class TokenService {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  decodeToken(token) {
    return jwtDecode(token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  logout() {
    localStorage.removeItem("token");
  }

  isUserLoggedApi() {
    const token = this.getToken();
    if (!token) {
      this.logout();
      return null;
    }
    if (this.isExpiredToken(token)) {
      this.logout();
      return null;
    }
    return jwtDecode(token);
  }
  isExpiredToken(token) {
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeOut = expire - Date.now();
    if (timeOut < 0) {
      return true;
    }
    return false;
  }
}
