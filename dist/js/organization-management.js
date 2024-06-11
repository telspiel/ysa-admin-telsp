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
/******/ 		"organization-management": 0
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
/******/ 	deferredModules.push(["./src/layouts/organization-management/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/organization-management/styles.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/organization-management/styles.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".autocomplete{\\r\\n    width: auto;\\r\\n    border: 1px solid #ced4da;\\r\\n    border-radius: 5px;\\r\\n    height: 33px;\\r\\n}\\r\\n#view-organization,#edit-organization{\\r\\n    display: contents;\\r\\n}\\r\\n.autocomplete .dropdown{\\r\\n    border-top: none;\\r\\n    border-bottom: none;\\r\\n    border-left: none;\\r\\n}\\r\\n.select2.select2-container{\\r\\nwidth: 25% !important;\\r\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/organization-management/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/organization-management/index.js":
/*!******************************************************!*\
  !*** ./src/layouts/organization-management/index.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/organization-management/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/form */ \"./src/scripts/form.js\");\n/* harmony import */ var _schema_organization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../schema/organization */ \"./src/schema/organization.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\n\n\nconsole.log(\"Welcome to organization management!\");\nconsole.log(\"Welcome to organization\");\n\n$(document).ready(function () {\n  $('.select2').select2();\n});\n\n$(\"#add-organization\").submit(function (e) {\n  e.preventDefault();\n\n  const formData = {};\n\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    operation: \"addOrganisation\"\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"saveOrganization\"), \"POST\", $.extend({}, formData, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      // console.log(data);\n      $(\".alert\").alert('close');\n      $(\"#add-organization\")[0].reset();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n    }\n  });\n});\n\nfunction enableFormSubmitAction() {\n\n  $(\"#edit-organization\").submit(function (e) {\n    // console.log(\"save\");\n    e.preventDefault();\n\n    const formData = {};\n\n    $(this).serializeArray().forEach(i => {\n      formData[i.name] = i.value;\n    });\n    var item = orgList.find(x => x.orgName == formData['orgName']);\n    const additionalData = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n      operation: \"editOrganisation\",\n      orgId: item.orgId\n    };\n\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"saveOrganization\"), \"POST\", $.extend({}, formData, additionalData)).done(data => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n        // console.log(data);\n        $(\"#edit-organization\")[0].reset();\n        $(\".alert\").alert('close');\n        data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n      }\n    });\n  });\n}\n\n$(\"#view-organization-tab\").click(() => {\n  $(\"#view-organization-form\").html(\"\");\n  loadDropdowns();\n});\n\n$(\"#view #name.select2\").on('change', function () {\n  // var item = orgList.find(x => x.orgName == this.value);\n  // if (item) {\n  dropdownChange(\"view-organization-form\", this.value, true);\n  // }\n});\n\n$(\"#edit #name1.select2\").on('change', function () {\n  // var item = orgList.find(x => x.orgName == this.value);\n  // if (item) {\n  dropdownChange(\"edit-organization-form\", this.value, false);\n  // }\n});\n\n$(\"#edit-organization-tab\").click(() => {\n  $(\"#edit-organization-form\").html(\"\");\n  loadDropdowns();\n});\n\nfunction dropdownChange(formId, value, disable) {\n  if (value == 0) {\n    return null;\n  }\n  const getUserData = {\n    \"loggedInUserName\": _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    \"orgId\": value\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getOrganization\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n    const user = data.data.organisation;\n    // console.log(user);\n    const viewSchema = $.extend(true, {}, _schema_organization__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n    viewSchema.fields.forEach(field => {\n      // console.log(field);\n      field.value = user[field.name];\n      field.disabled = disable;\n\n      if (field.type == \"select\") {\n        var selectList = field.options;\n        selectList.forEach(function (value) {\n          if (value.value == user[field.name]) {\n            value.selected = true;\n          }\n        });\n      }\n    });\n    if (disable) {\n      delete viewSchema.buttons[0];\n      viewSchema.id = _schema_organization__WEBPACK_IMPORTED_MODULE_3__[\"default\"].view.id;\n    } else {\n      viewSchema.id = _schema_organization__WEBPACK_IMPORTED_MODULE_3__[\"default\"].edit.id;\n    }\n\n    viewSchema.buttons[1].id = `reset-${_schema_organization__WEBPACK_IMPORTED_MODULE_3__[\"default\"].view.id}`;\n    viewSchema.buttons[1].class = `reset-${_schema_organization__WEBPACK_IMPORTED_MODULE_3__[\"default\"].view.id}` + \" btn btn-danger\";\n    new _scripts_form__WEBPACK_IMPORTED_MODULE_2__[\"default\"](viewSchema).render(\"#\" + formId);\n    $(\".\" + `reset-${_schema_organization__WEBPACK_IMPORTED_MODULE_3__[\"default\"].view.id}`).click(() => {\n      // console.log(\"reset-view-user\");\n      $(\"#\" + formId).html(\"\");\n    });\n    enableFormSubmitAction();\n  });\n}\n\nvar orgList;\nfunction loadDropdowns() {\n\n  const getUserData = {\n    \"loggedInUserName\": _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getAllOrganization\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n    const allChildMap = data.data.organisationList;\n\n    orgList = allChildMap;\n    const rList = allChildMap;\n\n    var selectField = document.getElementById(\"name\");\n    selectField.options.length = 1;\n    $.each(rList, function (key, value) {\n      selectField.options[selectField.options.length] = new Option(value.orgName, value.orgId);\n    });\n\n    var selectField1 = document.getElementById(\"name1\");\n    selectField1.options.length = 1;\n    $.each(rList, function (key, value) {\n      selectField1.options[selectField1.options.length] = new Option(value.orgName, value.orgId);\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/organization-management/index.js?");

/***/ }),

/***/ "./src/layouts/organization-management/styles.css":
/*!********************************************************!*\
  !*** ./src/layouts/organization-management/styles.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/organization-management/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/organization-management/styles.css?");

/***/ })

/******/ });