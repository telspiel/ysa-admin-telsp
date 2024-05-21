import "./../styles/app";

import User from "./user";

const loginInfo = require("./../partials/loginInfo.hbs");
const logo = require("./../partials/logo.hbs");


console.log("Welcome to app.js!");

if (typeof window === "object") {
  let app = (window.app = window.app || {});
  app.store = {};
  app.requests = [];
}

// Account Manger Nav List
if (User.getRole() == "accountmanager") {
  $('#userMgmtMenu').addClass("d-none");
  $('#OrgMgmtMenu').addClass("d-none");
  $('#SenIDMenu').addClass("d-none");
  $('#DepMgmtMenu').addClass("d-none");
  $('#ListUserMenu').addClass("d-none");
  $('#routingMenu').addClass("d-none");
  $('#CreditsMenu').addClass("d-none");
  $('#LogoMenu').addClass("d-none");
  $('#GenerateMenu').addClass("d-none");
  $('#ErrorMenu').addClass("d-none");
}

$(() => {
  if (User.isLoggedIn()) {
    $("#logo").append(
      logo({
        logo: User.getLogo()
      })
    );
    $("#topNavList").append(
      loginInfo({
        name: User.getName(),
        lastLogin: User.getLastLogin(),
        lastLoginIp: User.getLastLoginIp()
      })
    );

  } else {
    // console.log("Not logged In");
  }

  if (User.getRole() == "superadmin" || User.getRole() == "admin") {
    $("#operatorSummary").removeClass("d-none");
    $("#smppMgmt").removeClass("d-none");
  } else {
    $("#routingMenu").html("");
    $('#OrgMgmtMenu').addClass("d-none");
    $('#SenIDMenu').addClass("d-none");
    $('#DepMgmtMenu').addClass("d-none");
    $('#ListInternalUserMenu').addClass("d-none");
  }
});

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-5VS8M5W");
