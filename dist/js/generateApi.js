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
/******/ 		"generateApi": 0
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
/******/ 	deferredModules.push(["./src/layouts/generate-api/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/generate-api/styles.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/generate-api/styles.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"#successMsg{\\r\\n  display: none;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/generate-api/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/generate-api/index.js":
/*!*******************************************!*\
  !*** ./src/layouts/generate-api/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/generate-api/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n// ----------------Call Existing API--------------------------\n$(document).ready(function () {\n  $('.select2').select2();\n});\n$(function () {\n  $(\"#adminNameDiv .dropdown\").on('change', function () {\n    var value = this.value;\n    let withValue = false;\n    if (value && !withValue) {\n      withValue = true;\n      $(this).addClass('active');\n      var name = $(this).attr('name');\n      $(\"#adminNameDiv .dropdown\").not('.active').select2('destroy').val(\"\").select2();\n      $(\"#view .\" + name).val(value);\n      $(this).removeClass('active');\n    }\n    if (this.value) {\n      const data = {\n        loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n        userName: value,\n        operation: \"getUserApiKey\"\n      };\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserApi\"), \"POST\", data).done(data1 => {\n        $(\"#ExistingApi\").val(data1.data.apiKey);\n      });\n    }\n  });\n});\n// --------------Generate New API--------------\n$(\"#generateNewApi\").click(function () {\n  var name = \"\";\n  var adminName = $(\"#adminNameDiv .adminName\").children(\"option:selected\").val();\n  var resellerSelect = $(\"#adminNameDiv .resellerName \").children(\"option:selected\").val();\n  var sellerSelect = $(\"#adminNameDiv .sellerName \").children(\"option:selected\").val();\n  var clientSelect = $(\"#adminNameDiv .clientName \").children(\"option:selected\").val();\n  if (adminName.length > 0) {\n    name = adminName;\n  }\n  if (resellerSelect.length > 0) {\n    name = resellerSelect;\n  }\n  if (sellerSelect.length > 0) {\n    name = sellerSelect;\n  }\n  if (clientSelect.length > 0) {\n    name = clientSelect;\n  }\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    userName: name,\n    operation: \"getUserApiKey\"\n  };\n\n  var r = confirm(\"Are You sure you want to generate new Api ?\");\n  if (r == true) {\n\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"generateUserApi\"), \"POST\", data, {\n      showMainLoader: true\n    }).done(data1 => {\n      $(\".alert\").alert('close');\n      $('#successMsg').css(\"display\", \"block\");\n      $('#successMsg').html(data1.message);\n      $(\"#ExistingApi\").val(data1.data.apiKey);\n      setTimeout(function () {\n        $(\"#successMsg\").hide('slow');\n      }, 5000);\n    });\n  }\n});\n// ------------------- Select User Name ------------\n$(document).ready(function () {\n  const getUserData = {\n    \"loggedInUserName\": _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  var adminSelect = document.querySelector(\"#adminNameDiv .adminName\");\n  var resellerSelect = document.querySelector(\"#adminNameDiv .resellerName\");\n  var sellerSelect = document.querySelector(\"#adminNameDiv .sellerName\");\n  var clientSelect = document.querySelector(\"#adminNameDiv .clientName\");\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllUsers\"), \"POST\", getUserData).done(data => {\n    const aList = data.data.adminList;\n    if (aList.length === 0) {\n      $(\".adminNameDiv\").addClass('d-none');\n    }\n    adminSelect.options.length = 1;\n    $.each(aList, function (key, value) {\n      adminSelect.options[adminSelect.options.length] = new Option(value, value);\n    });\n    const rList = data.data.resellerList;\n    if (rList.length === 0) {\n      $(\".resellerNameDiv\").addClass('d-none');\n    }\n    resellerSelect.options.length = 1;\n    $.each(rList, function (key, value) {\n      resellerSelect.options[resellerSelect.options.length] = new Option(value, value);\n    });\n\n    const sList = data.data.sellerList;\n    if (sList.length == 0) {\n      $(\".sellerNameDiv\").addClass('d-none');\n    }\n    sellerSelect.options.length = 1;\n    $.each(sList, function (key, value) {\n      sellerSelect.options[sellerSelect.options.length] = new Option(value, value);\n    });\n\n    const cList = data.data.clientList;\n    const cListClient = data.data.clientList;\n    if (cList.length == 0) {\n      $(\".clientNameDiv\").addClass('d-none');\n    }\n    clientSelect.options.length = 1;\n    $.each(cList, function (key, value) {\n      clientSelect.options[clientSelect.options.length] = new Option(value, value);\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/layouts/generate-api/index.js?");

/***/ }),

/***/ "./src/layouts/generate-api/styles.css":
/*!*********************************************!*\
  !*** ./src/layouts/generate-api/styles.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/generate-api/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/generate-api/styles.css?");

/***/ })

/******/ });