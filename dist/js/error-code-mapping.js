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
/******/ 		"error-code-mapping": 0
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
/******/ 	deferredModules.push(["./src/layouts/error-code-mapping/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/error-code-mapping/styles.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/error-code-mapping/styles.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".frm-border .col-md-4 label {\\r\\n    margin-top: 0px;\\r\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/error-code-mapping/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/error-code-mapping/index.js":
/*!*************************************************!*\
  !*** ./src/layouts/error-code-mapping/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/error-code-mapping/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(document).ready(function () {\n  $('.select2').select2({ dropdownAutoWidth: true });\n});\n\n//var kennalList = null;\n\n\n// Upload Error Code Map--------------------------------------------------------------------------------------------------\n\n\nconst data = {\n  loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n};\n\ngetUserKannelListApi(data);\n\nfunction getUserKannelListApi(data) {\n\n  var groupSelect = document.querySelector(\".upload-kennalName\");\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserKennalList\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    console.log(data);\n\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n\n      let kennalobj = data.data.userKannelMap;\n\n      let keyofkennal = Object.keys(kennalobj);\n      let valofkennal = Object.values(kennalobj);\n\n      console.log(keyofkennal);\n      console.log(valofkennal);\n\n      const result = keyofkennal.map((kennalName, i) => ({ kennalName, kennalId: valofkennal[i] }));\n      console.log(result);\n\n      groupSelect.options.length = 1;\n      $.each(result, function (key, value) {\n        groupSelect.options[groupSelect.options.length] = new Option(value.kennalName, value.kennalId);\n      });\n    }\n  });\n}\n\n$(\"#selectFile\").change(function () {\n  $(\"#fileName\").text(this.files[0].name);\n});\n\n$(\"#btnSubmit\").click(function (e) {\n\n  console.log($(\"#upload-kennalName\").val());\n\n  const file = $(\"#selectFile\").get(0).files[0];\n\n  if (!file) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select a file.\");\n    return;\n  }\n\n  let ukn = $('#upload-kennalName').val();\n  if (ukn == 0) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select a Kennal.\");\n    return;\n  }\n\n  if (!$('input[name=\"upload-retry\"]').is(':checked')) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select the option.\");\n    return;\n  }\n\n  if (!$('input[name=\"upload-cretry\"]').is(':checked')) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select the option.\");\n    return;\n  }\n\n  let peci = $('#upload-platformErrorCodeId').val();\n  if (peci == \"\") {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select Platform Error Code Id.\");\n    return;\n  }\n\n  const formData = new FormData();\n  formData.append(\"userName\", _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName());\n  // formData.append(\"fileType\", $(\"input[name=fileType]:checked\").val());\n  formData.append(\"file\", file);\n  formData.append(\"fileType\", \"xlsx\");\n  formData.append(\"isRetryEnabled\", $('input[name=\"upload-retry\"]:checked').val());\n  formData.append(\"isCarrierRetryEnabled\", $('input[name=\"upload-cretry\"]:checked').val());\n  formData.append(\"platformErrorCodeId\", $(\"#upload-platformErrorCodeId\").val());\n  formData.append(\"kannelId\", $(\"#upload-kennalName\").val());\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"uploadErrorCodeFile\"), \"POST\", formData, {\n    showMainLoader: true,\n    contentType: false,\n    processData: false,\n    data: formData\n  }).done(data => {\n    console.log(data);\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 10 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data.message, {\n        clearTime: 10 * 1000\n      }));\n    }\n  });\n});\n\n// Add Error Code --------------------------------------------------------------------------------------------------\n\n\ngetUserKannelListAddApi(data);\n\nfunction getUserKannelListAddApi(data) {\n\n  var groupSelect = document.querySelector(\".add-kennalName\");\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserKennalList\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    console.log(data);\n\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n\n      let kennalobj = data.data.userKannelMap;\n\n      let keyofkennal = Object.keys(kennalobj);\n      let valofkennal = Object.values(kennalobj);\n\n      console.log(keyofkennal);\n      console.log(valofkennal);\n\n      const result = keyofkennal.map((kennalName, i) => ({ kennalName, kennalId: valofkennal[i] }));\n      console.log(result);\n\n      groupSelect.options.length = 1;\n      $.each(result, function (key, value) {\n        groupSelect.options[groupSelect.options.length] = new Option(value.kennalName, value.kennalId);\n      });\n    }\n  });\n}\n\nfunction addErrorCodeMappingApi(addformData) {\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"addNewErrorCode\"), \"POST\", addformData, {\n    showMainLoader: true,\n    // contentType: false,\n    processData: false\n    // data: addformData\n  }).done(data => {\n    console.log(data);\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 10 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data.message, {\n        clearTime: 10 * 1000\n      }));\n    }\n  });\n}\n\n$(\"#add-btnSubmit\").click(function (e) {\n\n  console.log($(\"#add-kennalName\").val());\n  console.log($.type(_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()));\n\n  var sVal = $(\"#add-kennalName\").val();\n  var kid = parseInt(sVal);\n  console.log($.type(kid));\n\n  let akn = $('#add-kennalName').val();\n  if (akn == 0) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select a Kennal.\");\n    return;\n  }\n\n  if (!$('input[name=\"add-retry\"]').is(':checked')) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select the option.\");\n    return;\n  }\n\n  if (!$('input[name=\"add-cretry\"]').is(':checked')) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select the option.\");\n    return;\n  }\n\n  // var pVal = $(\"#add-platformErrorCode\").val();\n  // var pid = parseInt(pVal)\n  // console.log($.type(pid));\n\n  // const addformData = new FormData();\n  // addformData.append(\"userName\", User.getName());\n  // // formData.append(\"fileType\", $(\"input[name=fileType]:checked\").val());\n  // addformData.append(\"isRetryEnabled\", $('input[name=\"add-retry\"]:checked').val());\n  // addformData.append(\"isCarrierRetryEnabled\", $('input[name=\"add-cretry\"]:checked').val());\n  // addformData.append(\"platformErrorCodeId\", $(\"#add-platformErrorCodeId\").val());\n  // addformData.append(\"kannelId\", kid);\n  // addformData.append(\"error_code\", $(\"#errorCode\").val());\n  // addformData.append(\"error_desc\", $(\"#errorDesc\").val());\n  // addformData.append(\"platform_error_code\", pid);\n  // addformData.append(\"platform_error_desc\", $(\"#platformErrorDesc\").val());\n\n\n  const addformData = {\n    userName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    isRetryEnabled: $('input[name=\"add-retry\"]:checked').val(),\n    isCarrierRetryEnabled: $('input[name=\"add-cretry\"]:checked').val(),\n    platformErrorCodeId: $(\"#add-platformErrorCodeId\").val(),\n    kannelId: kid,\n    error_code: $(\"#errorCode\").val(),\n    error_desc: $(\"#errorDesc\").val(),\n    platform_error_code: $(\"#add-platformErrorCode\").val(),\n    platform_error_desc: $(\"#platformErrorDesc\").val()\n\n    // Request(Endpoints.get(\"addNewErrorCode\"), \"POST\", addformData, {\n    //   showMainLoader: true,\n    //   contentType: false,\n    //   processData: false,\n    //   data: addformData\n    // }).done(data => {\n    //     console.log(data);\n    //   if (Endpoints.validateResponse(data)) {\n\n    //     data.message &&\n    //       (data.result === \"Success\"\n    //         ? Alert.success(data.message, {\n    //           clearTime: 10 * 1000\n    //         })\n    //         : Alert.error(data.message, {\n    //           clearTime: 10 * 1000\n    //         }));\n    //   }\n    // });\n\n  };addErrorCodeMappingApi(addformData);\n});\n\n//# sourceURL=webpack:///./src/layouts/error-code-mapping/index.js?");

/***/ }),

/***/ "./src/layouts/error-code-mapping/styles.css":
/*!***************************************************!*\
  !*** ./src/layouts/error-code-mapping/styles.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/error-code-mapping/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/error-code-mapping/styles.css?");

/***/ })

/******/ });