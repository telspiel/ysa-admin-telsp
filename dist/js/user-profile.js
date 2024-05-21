/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"user-profile": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/layouts/user-profile/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/user-profile/styles.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/user-profile/styles.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"#pswd_info {\\r\\n    right:55px;\\r\\n    padding:15px;\\r\\n    background:#fefefe;\\r\\n    font-size:.875em;\\r\\n    border-radius:5px;\\r\\n    box-shadow:0 1px 3px #ccc;\\r\\n    border:1px solid #ddd;\\r\\n}\\r\\n\\r\\n#pswd_info h4 {\\r\\n    margin:0 0 10px 0;\\r\\n    padding:0;\\r\\n    font-weight:normal;\\r\\n}\\r\\n\\r\\n#pswd_info::before {\\r\\n    content: \\\"\\\\25B2\\\";\\r\\n    position:absolute;\\r\\n    top:-12px;\\r\\n    left:45%;\\r\\n    font-size:14px;\\r\\n    line-height:14px;\\r\\n    color:#ddd;\\r\\n    text-shadow:none;\\r\\n    display:block;\\r\\n}\\r\\n.invalid {\\r\\n    padding-left:22px;\\r\\n    line-height:24px;\\r\\n    color:#ec3f41;\\r\\n}\\r\\n.valid {\\r\\n    padding-left:22px;\\r\\n    line-height:24px;\\r\\n    color:#3a7d34;\\r\\n}\\r\\n#pswd_info {\\r\\n    display:none;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/user-profile/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/user-profile/index.js":
/*!*******************************************!*\
  !*** ./src/layouts/user-profile/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/user-profile/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_profileForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/profileForm */ \"./src/scripts/profileForm.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _scripts_userProfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/userProfile */ \"./src/scripts/userProfile.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\n\n// console.log(\"Welcome to User-Profile\");\n\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n//\n\n//\n$(document).ready(function () {\n  $('#newPassword').keyup(function () {\n    var pswd = $(this).val();\n    if (/^[a-zA-Z0-9- ]*$/.test(pswd) == false) {\n      $('#specialChar').removeClass('invalid').addClass('valid');\n      $('#specialChar .fa').removeClass('fa-times').addClass('fa-check');\n    } else {\n      $('#specialChar').removeClass('valid').addClass('invalid');\n      $('#specialChar .fa').removeClass('fa-check').addClass('fa-times');\n    }\n    if (pswd.length < 8) {\n      $('#length').removeClass('valid').addClass('invalid');\n      $('#length .fa').removeClass('fa-check').addClass('fa-times');\n    } else {\n      $('#length').removeClass('invalid').addClass('valid');\n      $('#length .fa').removeClass('fa-times').addClass('fa-check');\n    }\n    //validate letter\n    if (pswd.match(/[A-z]/)) {\n      $('#letter').removeClass('invalid').addClass('valid');\n      $('#letter .fa').removeClass('fa-times').addClass('fa-check');\n    } else {\n      $('#letter').removeClass('valid').addClass('invalid');\n      $('#letter .fa').removeClass('fa-check').addClass('fa-times');\n    }\n\n    //validate capital letter\n    if (pswd.match(/[A-Z]/)) {\n      $('#capital').removeClass('invalid').addClass('valid');\n      $('#capital .fa').removeClass('fa-times').addClass('fa-check');\n    } else {\n      $('#capital').removeClass('valid').addClass('invalid');\n      $('#capital .fa').removeClass('fa-check').addClass('fa-times');\n    }\n\n    //validate number\n    if (pswd.match(/\\d/)) {\n      $('#number').removeClass('invalid').addClass('valid');\n      $('#number .fa').removeClass('fa-times').addClass('fa-check');\n    } else {\n      $('#number').removeClass('valid').addClass('invalid');\n      $('#number .fa').removeClass('fa-check').addClass('fa-times');\n    }\n  }).focus(function () {\n    $('#pswd_info').show();\n  }).blur(function () {\n    $('#pswd_info').hide();\n  });\n});\n$(\"#controls-form\").submit(function (e) {\n  var newpass = $('#newPassword').val();\n  var confpass = $('#confirmPassword').val();\n  if (newpass != confpass) {\n    confirm(\"Please make sure your passwords match\");\n    return;\n  }\n  e.preventDefault();\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getName(),\n    oldPassword: this[0].value,\n    newPassword: this[1].value\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"updatedPassword\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n      clearTime: 10 * 1000\n    }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message, {\n      clearTime: 10 * 1000\n    }));\n  });\n});\n// user Profile\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getName()\n};\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"profileDetails\"), \"POST\", data).done(data => {\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n    // console.log(data);\n    const user = data.data.user;\n    const viewuser = $.extend(true, {}, _scripts_userProfile__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    viewuser.fields.forEach(field => {\n      field.value = user[field.name];\n      field.disabled = true;\n    });\n    new _scripts_profileForm__WEBPACK_IMPORTED_MODULE_2__[\"default\"](viewuser).render(\"#view-user-form\");\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/user-profile/index.js?");

/***/ }),

/***/ "./src/layouts/user-profile/styles.css":
/*!*********************************************!*\
  !*** ./src/layouts/user-profile/styles.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/user-profile/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/user-profile/styles.css?");

/***/ }),

/***/ "./src/scripts/profileForm.js":
/*!************************************!*\
  !*** ./src/scripts/profileForm.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst input = __webpack_require__(/*! ./../partials/form/input.hbs */ \"./src/partials/form/input.hbs\");\nconst select = __webpack_require__(/*! ./../partials/form/select.hbs */ \"./src/partials/form/select.hbs\");\nconst textarea = __webpack_require__(/*! ./../partials/form/textarea.hbs */ \"./src/partials/form/textarea.hbs\");\nconst radio = __webpack_require__(/*! ./../partials/form/radio.hbs */ \"./src/partials/form/radio.hbs\");\nconst checkbox = __webpack_require__(/*! ./../partials/form/checkbox.hbs */ \"./src/partials/form/checkbox.hbs\");\nconst button = __webpack_require__(/*! ./../partials/form/button.hbs */ \"./src/partials/form/button.hbs\");\n\nclass Form {\n  constructor(form) {\n    this.form = form;\n  }\n\n  getFields(fields) {\n    if (fields.constructor !== Array || !fields.length) {\n      return null;\n    }\n    return fields.map(field => {\n      switch (field.type) {\n        case \"text\":\n        case \"password\":\n        case \"number\":\n        case \"email\":\n        case \"tel\":\n        case \"file\":\n          return input(field);\n        case \"select\":\n          return select(field);\n        case \"textarea\":\n          return textarea(field);\n        case \"radio\":\n          if (field.value) {\n            const option = field.options.find(o => o.value === field.value);\n            if (!!option) {\n              field.options.forEach(o => {\n                o.checked = false;\n              });\n              option.checked = true;\n            }\n          } else {\n            const checked = field.options.find(o => o.checked);\n            !checked && (field.options[1].checked = true);\n          }\n          return radio(field);\n        case \"checkbox\":\n          return checkbox(field);\n        default:\n          return null;\n      }\n    });\n  }\n\n  getButtons(buttons) {\n    if (buttons && buttons.constructor === Array && buttons.length) {\n      return buttons.map(btn => button(btn));\n    }\n    return null;\n  }\n\n  render(container) {\n    $(container).html(this.getFields(this.form.fields), this.getButtons(this.form.buttons));\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form);\n\n//# sourceURL=webpack:///./src/scripts/profileForm.js?");

/***/ }),

/***/ "./src/scripts/userProfile.js":
/*!************************************!*\
  !*** ./src/scripts/userProfile.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../scripts/validator */ \"./src/scripts/validator.js\");\n\n\nconst ViewUser = {\n  id: \"view-user\",\n  action: \"#\",\n  method: \"post\",\n  fields: [{\n    label: \"User Name\",\n    type: \"text\",\n    id: \"username\",\n    name: \"username\",\n    title: \"User Name\",\n    placeholder: \"User Name\",\n    required: true\n  }, {\n    label: \"Password\",\n    type: \"text\",\n    id: \"password\",\n    name: \"password\",\n    title: \"Password\",\n    placeholder: \"Password \",\n    required: true\n  }, {\n    label: \"Email ID\",\n    type: \"text\",\n    id: \"emailID\",\n    name: \"emailID\",\n    title: \"Email ID\",\n    placeholder: \"Email ID \",\n    required: true\n  }, {\n    label: \"Mobile Number\",\n    type: \"text\",\n    id: \"mobileNumber\",\n    name: \"mobileNumber\",\n    title: \"Mobile Number .\",\n    placeholder: \"Mobile Number \",\n    required: true\n  }, {\n    label: \"Organization\",\n    type: \"text\",\n    id: \"organization\",\n    name: \"organization\",\n    title: \"Organization.\",\n    placeholder: \"Organization \",\n    required: true\n  }, {\n    label: \"Department\",\n    type: \"text\",\n    id: \"department\",\n    name: \"department\",\n    title: \"Department .\",\n    placeholder: \"Department \",\n    required: true\n    // {\n    //   label: \"Account Manager\",\n    //   type: \"text\",\n    //   id: \"accountManager\",\n    //   name: \"accountManager\",\n    //   title: \"Account Manager .\",\n    //   placeholder: \"Account Manager \"\n    // },\n    // {\n    //   label: \"Contact Number\",\n    //   type: \"text\",\n    //   id: \"contactNumber\",\n    //   name: \"contactNumber\",\n    //   title: \"Contact Number .\",\n    //   placeholder: \"Contact Number \"\n    // }\n  }]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewUser);\n\n//# sourceURL=webpack:///./src/scripts/userProfile.js?");

/***/ })

/******/ });