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
/******/ 		"credits-management": 0
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
/******/ 	deferredModules.push(["./src/layouts/credits-management/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/credits-management/styles.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/credits-management/styles.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".credits-form {\\n  padding: 30px 10px;\\n  width: 50%;\\n}\\n#misTable_filter{\\n  display:none;\\n}\\n.select2-container{\\nwidth: 100% !important;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/credits-management/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/credits-management/index.js":
/*!*************************************************!*\
  !*** ./src/layouts/credits-management/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/credits-management/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/form */ \"./src/scripts/form.js\");\n/* harmony import */ var _schema_credits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../schema/credits */ \"./src/schema/credits.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\n// console.log(\"Welcome to credits management!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n$(\".nav-item\").click(() => {\n  $(\"#nav-tabContent .dropdown\").not(\".active\").select2(\"destroy\").val(\"\").select2();\n  $(\"#deduct-credits\")[0].reset();\n  $(\"#add-credit\")[0].reset();\n  $(\"#view-credits\")[0].reset();\n});\n$(document).ready(function () {\n  $(\".select2\").select2();\n});\nvar userAccessArr = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getUserPrivilage().split(\",\");\n$.each(userAccessArr, function (index, value) {\n  console.log(value);\n  if (value == \"SHOW_CREDIT_HISTORY_PAGE\") {\n    $(\"#view-credits-history\").removeClass(\"d-none\");\n  }\n});\n\nconst renderDetailedMis = data => {\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n  const grid = (data.data || {}).grid || [];\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n\n  if ($.fn.dataTable.isDataTable(\"#misTable\")) {\n    $(\"#misTable\").DataTable().destroy();\n  }\n  $(\"#misTable\").DataTable({\n    data: tableData,\n    columns: [{ title: \"Created Date\" }, { title: \"Credit\" }, { title: \"Status\" }, { title: \"Updated Credit\" }, { title: \"Updated By\" }, { title: \"Comment\" }],\n    order: [[0, \"desc\"]]\n  });\n\n  //To download credit history table data in cvs and xlsx format\n\n  // document\n  //   .getElementById(\"downloadBtn\")\n  //   .addEventListener(\"click\", function downloadTable() {\n  //     // Convert table data to desired format (CSV or XLSX)\n  //     var table = document.getElementById(\"misTable\");\n  //     var tableData = new Array();\n  //     for (var i = 0, row; (row = table.rows[i]); i++) {\n  //       var rowData = new Array();\n  //       for (var j = 0, col; (col = row.cells[j]); j++) {\n  //         rowData.push(col.textContent.trim());\n  //       }\n  //       tableData.push(rowData.join(\",\"));\n  //     }\n  //     // Convert to CSV or XLSX using SheetJS\n  //     var wb = XLSX.utils.book_new();\n  //     wb.SheetNames.push(\"Table Data\");\n  //     var wsData = XLSX.utils.aoa_to_sheet(\n  //       tableData.map((row) => row.split(\",\"))\n  //     );\n  //     wb.Sheets[\"Table Data\"] = wsData;\n  //     var wbout = XLSX.write(wb, { bookType: \"xlsx\", type: \"array\" });\n  //     // Trigger download\n  //     saveAs(\n  //       new Blob([wbout], { type: \"application/octet-stream\" }),\n  //       \"table_data.xlsx\"\n  //     );\n  //     // Remove event listener after the download is triggered\n  //     document\n  //       .getElementById(\"downloadBtn\")\n  //       .removeEventListener(\"click\", downloadTable);\n  //   });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#pageNext\").show();\n  } else {\n    $(\"#pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#pagePrev\").show();\n  } else {\n    $(\"#pagePrev\").hide();\n  }\n};\n\n// new Form(Schema).render(\"#add-credits-form\");\n\n// $(\"#cancelForm\").click(() => {\n//   $(\"#add-credit\")[0].reset();\n// });\n\n$(\"#add-credit\").submit(function (e) {\n  e.preventDefault();\n  var data = getFormData($(\"#add-credit\").serializeArray());\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    operation: \"addCredit\"\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"updateCredit\"), \"POST\", $.extend({}, data, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      // console.log(data);\n      $(\"#add-credit\")[0].reset();\n      $(\".alert\").alert(\"close\");\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n    }\n  });\n});\n\n$(\"#deduct-credits\").submit(function (e) {\n  e.preventDefault();\n  var data = getFormData($(\"#deduct-credits\").serializeArray());\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    operation: \"deductCredit\"\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"updateCredit\"), \"POST\", $.extend({}, data, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      // console.log(data);\n      $(\"#deduct-credits\")[0].reset();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n    }\n  });\n});\n\n$(\"#deduct-credits-tab\").click(() => {\n  // new Form(Schema.view).render(\"#view-credits-form\");\n  loadDropdowns(\"deduct-credits\");\n});\n\n$(\"#view-credits-tab\").click(() => {\n  // new Form(Schema.view).render(\"#view-credits-form\");\n  loadDropdowns(\"view-credits\");\n});\n\n$(\"#view-credits .dropdown\").on(\"change\", function () {\n  var value = this.value;\n  let withValue = false;\n  var selected = this.value;\n  if (value && !withValue) {\n    withValue = true;\n    $(this).addClass(\"active\");\n    var name = $(this).attr(\"name\");\n    $(\"#view-credits .dropdown\").not(\".active\").select2(\"destroy\").val(\"\").select2();\n    $(\".\" + name).val(value);\n    $(this).removeClass(\"active\");\n  }\n\n  if (this.value) {\n    var data = getFormData($(\"#view-credits\").serializeArray());\n    data[\"loggedInUserName\"] = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName();\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"viewCredit\"), \"POST\", data).done(data => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n        if (data.result === \"Success\") {\n          var result = data.data.userCredit;\n          $.each(result, function (key, val) {\n            $(\"#view-credits .\" + key).val(val);\n          });\n        } else {\n          _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(selected + \" : \" + data.message);\n          $(\"#view-credits\")[0].reset();\n        }\n      }\n    });\n  }\n});\n\n$(\"#deduct-credits .dropdown\").on(\"change\", function () {\n  var value = this.value;\n  let withValue = false;\n  var selected = this.value;\n  if (value && !withValue) {\n    withValue = true;\n    $(this).addClass(\"active\");\n    var name = $(this).attr(\"name\");\n    $(\"#deduct-credits .dropdown\").not(\".active\").select2(\"destroy\").val(\"\").select2();\n    $(\".\" + name).val(value);\n    $(this).removeClass(\"active\");\n  }\n  if (this.value) {\n    var data = getFormData($(\"#deduct-credits\").serializeArray());\n    data[\"loggedInUserName\"] = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName();\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"viewCredit\"), \"POST\", data).done(data => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n        if (data.result === \"Success\") {\n          var result = data.data.userCredit;\n          $.each(result, function (key, val) {\n            $(\"#deduct-credits .\" + key).val(val);\n          });\n        } else {\n          _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(selected + \" : \" + data.message);\n          $(\"#deduct-credits\")[0].reset();\n        }\n      }\n    });\n  }\n});\n\n$(function () {\n  loadDropdowns(\"add-credit\");\n  $(\"#add-credit .dropdown\").on(\"change\", function () {\n    var value = this.value;\n    let withValue = false;\n    var selected = this.value;\n    if (value && !withValue) {\n      withValue = true;\n      $(this).addClass(\"active\");\n      var name = $(this).attr(\"name\");\n      $(\"#add-credit .dropdown\").not(\".active\").select2(\"destroy\").val(\"\").select2();\n      $(\".\" + name).val(value);\n      $(this).removeClass(\"active\");\n    }\n    if (this.value) {\n      var data = getFormData($(\"#add-credit\").serializeArray());\n      data[\"loggedInUserName\"] = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName();\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"viewCredit\"), \"POST\", data).done(data => {\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n          if (data.result === \"Success\") {\n            var result = data.data.userCredit;\n            $.each(result, function (key, val) {\n              $(\"#add-credit .\" + key).val(val);\n            });\n          } else {\n            _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(selected + \" : \" + data.message);\n            $(\"#add-credit\")[0].reset();\n          }\n        }\n      });\n    }\n  });\n});\n$(function () {\n  loadDropdowns(\"credit-history\");\n  $(\"#credit-history .dropdown\").on(\"change\", function () {\n    var value = this.value;\n    let withValue = false;\n    var selected = this.value;\n    if (value && !withValue) {\n      withValue = true;\n      $(this).addClass(\"active\");\n      var name = $(this).attr(\"name\");\n      $(\"#credit-history .dropdown\").not(\".active\").select2(\"destroy\").val(\"\").select2();\n      $(\".\" + name).val(value);\n      $(this).removeClass(\"active\");\n    }\n    if (this.value) {\n      var data = getFormData($(\"#credit-history\").serializeArray());\n      data[\"loggedInUserName\"] = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName();\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"viewCredit\"), \"POST\", data).done(data => {\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n          if (data.result === \"Success\") {\n            var result = data.data.userCredit;\n            $.each(result, function (key, val) {\n              $(\"#credit-history .\" + key).val(val);\n            });\n          } else {\n            _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(selected + \" : \" + data.message);\n            $(\"#credit-history\")[0].reset();\n          }\n        }\n      });\n    }\n  });\n});\n$(\"#add-credit\").on(\"reset\", function (e) {\n  // $(\".dropdown\").prop('disabled', false);\n});\n\nfunction loadDropdowns(containerID) {\n  // $(\".dropdown\").prop('disabled', false);\n\n  var today = new Date();\n  var date = today.getFullYear() + \"-\" + (today.getMonth() + 1) + \"-\" + today.getDate();\n\n  const getUserData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName()\n  };\n\n  var adminSelect = document.querySelector(\"#\" + containerID + \" .adminName\");\n  var resellerSelect = document.querySelector(\"#\" + containerID + \" .resellerName\");\n  var sellerSelect = document.querySelector(\"#\" + containerID + \" .sellerName\");\n  var clientSelect = document.querySelector(\"#\" + containerID + \" .clientName\");\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getAllUsers\"), \"POST\", getUserData).done(data => {\n    const aList = data.data.adminList;\n    if (aList.length === 0) {\n      $(\".adminNameDiv\").addClass(\"d-none\");\n    }\n    adminSelect.options.length = 1;\n    $.each(aList, function (key, value) {\n      adminSelect.options[adminSelect.options.length] = new Option(value, value);\n    });\n\n    const rList = data.data.resellerList;\n    if (rList.length === 0) {\n      $(\".resellerNameDiv\").addClass(\"d-none\");\n    }\n    resellerSelect.options.length = 1;\n    $.each(rList, function (key, value) {\n      resellerSelect.options[resellerSelect.options.length] = new Option(value, value);\n    });\n\n    const sList = data.data.sellerList;\n    if (sList.length == 0) {\n      $(\".sellerNameDiv\").addClass(\"d-none\");\n    }\n    sellerSelect.options.length = 1;\n    $.each(sList, function (key, value) {\n      sellerSelect.options[sellerSelect.options.length] = new Option(value, value);\n    });\n\n    const cList = data.data.clientList;\n    if (cList.length == 0) {\n      $(\".clientNameDiv\").addClass(\"d-none\");\n    }\n    clientSelect.options.length = 1;\n    $.each(cList, function (key, value) {\n      clientSelect.options[clientSelect.options.length] = new Option(value, value);\n    });\n  });\n}\n\nfunction getFormData(unindexed_array) {\n  // var unindexed_array = $form.serializeArray();\n  var indexed_array = {};\n  $.map(unindexed_array, function (n, i) {\n    if (n[\"value\"] != \"\") {\n      // if (n['value'] !== \"\" || n['value'] !== null) {\n      indexed_array[n[\"name\"]] = n[\"value\"];\n    }\n  });\n  return indexed_array;\n}\n\nconst now = moment(new Date()).format(\"YYYY-MM-DD\");\n$(() => {\n  $(\".datepicker\").val(now);\n  $(\"#from\").datetimepicker({\n    format: \"Y-m-d\",\n    timepicker: false\n  });\n\n  $(\"#to\").datetimepicker({\n    format: \"Y-m-d\",\n    timepicker: false\n  });\n});\n$(\"#credit-history\").submit(function (e) {\n  e.preventDefault();\n  var data = getFormData($(\"#credit-history\").serializeArray());\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getCreditHistory\"), \"POST\", $.extend({}, additionalData, data)).done(data => {\n    renderDetailedMis(data);\n  });\n});\n$(\"#view-credits-history\").click(function () {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    fromDate: $(\"#from\").val(),\n    toDate: $(\"#to\").val()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getCreditHistory\"), \"POST\", data).done(data => {\n    renderDetailedMis(data);\n  });\n});\n\n//# sourceURL=webpack:///./src/layouts/credits-management/index.js?");

/***/ }),

/***/ "./src/layouts/credits-management/styles.css":
/*!***************************************************!*\
  !*** ./src/layouts/credits-management/styles.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/credits-management/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/credits-management/styles.css?");

/***/ }),

/***/ "./src/schema/credits.js":
/*!*******************************!*\
  !*** ./src/schema/credits.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Schema = {\n  id: \"add-credit\",\n  action: \"#\",\n  method: \"post\",\n  fields: [{\n    label: \"Organization\",\n    type: \"text\",\n    id: \"orgName\",\n    name: \"orgName\",\n    title: \"Enter Organization name.\",\n    placeholder: \"Organization Name\",\n    required: true\n  }, {\n    label: \"Department\",\n    type: \"text\",\n    id: \"deptName\",\n    name: \"deptName\",\n    title: \"Enter Department name.\",\n    placeholder: \"Department Name\",\n    required: true\n  }, {\n    label: \"User\",\n    type: \"text\",\n    id: \"userName\",\n    name: \"userName\",\n    title: \"Enter User name.\",\n    placeholder: \"User Name\",\n    required: true\n  }, {\n    label: \"Available Credit\",\n    type: \"text\",\n    id: \"availableCredit\",\n    name: \"availableCredit\",\n    title: \"Available Credit\",\n    disabled: true\n  }, {\n    label: \"Add Credit\",\n    type: \"number\",\n    id: \"creditToBeAdded\",\n    name: \"creditToBeAdded\",\n    title: \"Add Credit\",\n    placeholder: \"Enter Credit Amount\",\n    required: true\n  }],\n  buttons: [{\n    type: \"submit\",\n    value: \"Save\"\n  }, {\n    type: \"button\",\n    value: \"Cancel\",\n    id: \"cancelForm\"\n  }]\n};\n\nSchema.view = {\n  id: \"view-user\",\n  action: \"#\",\n  method: \"post\",\n  fields: [{\n    label: \"Organization\",\n    type: \"text\",\n    id: \"orgNameView\",\n    name: \"orgNameView\",\n    title: \"Enter Organization name.\",\n    placeholder: \"Organization Name\",\n    required: true\n  }, {\n    label: \"Department\",\n    type: \"text\",\n    id: \"deptNameView\",\n    name: \"deptNameView\",\n    title: \"Enter Department name.\",\n    placeholder: \"Department Name\",\n    required: true\n  }, {\n    label: \"User\",\n    type: \"text\",\n    id: \"userNameView\",\n    name: \"userNameView\",\n    title: \"Enter User name.\",\n    placeholder: \"User Name\",\n    required: true\n  }]\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Schema);\n\n//# sourceURL=webpack:///./src/schema/credits.js?");

/***/ })

/******/ });