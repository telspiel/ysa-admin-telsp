import Cookie from "./cookie";

class User {
  constructor() {
    this.name = Cookie.get("resellerUser");
    this.token = Cookie.get("resellerToken");
    this.role = Cookie.get("resellerRole");
    this.logo = Cookie.get("logoUrl");
    this.userId = Cookie.get("userId");
    this.lastLogin = Cookie.get("lastLogin");
    this.lastLoginip = Cookie.get("lastLoginip");
    this.userPrivilage= Cookie.get("resellerUserPrivilage");
    this.jwtToken = Cookie.get("resellerJWT");
  }

  getName() {
    return this.name;
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  getLogo() {
    return this.logo;
  }

  getUserid() {
    return this.userId;
  }

  getJWTToken() {
    return this.jwtToken;
  }

  getLastLogin() {
    return this.lastLogin;
  }

  getLastLoginIp() {
    return this.lastLoginip;
  }

  getUserPrivilage(){
    return this.userPrivilage;
  }
  
  setLastLogin(lastLogin) {
    this.lastLogin = lastLogin;
    Cookie.set("lastLogin", lastLogin, 7);
    return this;
  }

  setLastLoginIP(ip) {
    this.lastLoginip = ip;
    Cookie.set("lastLoginip", ip, 7);
    return this;
  }

  setJWTToken(jwt) {
    this.jwtToken = jwt;
    Cookie.set("resellerJWT", jwt, 7);
    return this;
  }

  setRole(role) {
    this.role = role;
    Cookie.set("resellerRole", role, 7);
    return this;
  }

  updateTokenExpiry() {
    var dt = new Date();
    dt.setTime(dt.getTime() + 10 * 60 * 1000);
    // expiry time set to 10 min
    Cookie.set("tokenResellerExpiry", dt, 7)
  }

  setLogo(logo) {
    this.logo = logo;
    Cookie.set("logoUrl", logo, 7);
    return this;
  }

  setName(name) {
    this.name = name;
    Cookie.set("resellerUser", name, 7);
    return this;
  }

  setUserid(userId){
    this.userId = userId;
    Cookie.set("userId", userId, 7);
    return this;
  }

  setToken(token) {
    this.token = token;
    Cookie.set("resellerToken", token, 7);
    return this;
  }

  setUserPrivilage(userPrivilage){
    this.userPrivilage = userPrivilage;
    Cookie.set("resellerUserPrivilage", userPrivilage, 7);
    return this;
  }

  isLoggedIn() {
    return this.getToken() ? true : false;
  }

  login(user) {
    this.isLoggedIn() &&
      (window.location.href = "/dashboard");
    return this;
  }

  logout() {
    this.name = "";
    this.token = "";
    Cookie.del("resellerUser");
    Cookie.del("resellerToken");
    Cookie.del("tokenResellerExpiry");
    Cookie.del("resellerRole");
    Cookie.del("logoUrl");
    Cookie.del("userId");
    Cookie.del("resellerUserPrivilage");
    Cookie.del("resellerJWT");
    return this;
  }

  // Function to load the saved logo image from local storage
   loadSavedImage() {
    const loggedInUserName = this.getName();
    const savedImage = localStorage.getItem(`uploadedImage_${loggedInUserName}`);
    const $uploadedImage = $('#uploadedImage');

    if (savedImage) {
      $uploadedImage.attr('src', savedImage).show();
    } else {
      $uploadedImage.attr('src', '').hide(); // Hide the image if no image is loaded initially
    }
  }
}



// Call the function to load the saved image when the document is ready
$(document).ready(function() {
  const user = new User();
  user.loadSavedImage();
});

export default new User();
