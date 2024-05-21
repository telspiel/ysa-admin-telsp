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
/******/ 		"listUser": 0
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
/******/ 	deferredModules.push(["./src/layouts/list-user/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/list-user/styles.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/list-user/styles.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n/* #pagePrev, #pageNext {\\n  display: none;\\n} */\\n#misTable_length,#misTable_filter,#misTable_info,#misTable_paginate{\\n//display:none;\\n}\\n.dataTables_paginate{\\n  display: none;\\n}\\n.dataTables_info{\\n  display: none;\\n}\\n\\n.dataTables_length{\\n  display: none;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/list-user/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/list-user/index.js":
/*!****************************************!*\
  !*** ./src/layouts/list-user/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/list-user/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\n// console.log(\"List User\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nconst renderDetailedMis = data => {\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n  const grid = (data.data || {}).listUserFormDataGrid || [];\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  console.log(grid);\n\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n\n  console.log(tableData);\n\n  if ($.fn.dataTable.isDataTable(\"#misTable\")) {\n    $(\"#misTable\").DataTable().destroy();\n  }\n  $(\"#misTable\").DataTable({\n    data: tableData,\n    searching: false,\n    columns: [{ title: \"User Name\" }, { title: \"Password\" }, { title: \"Contact Number\" }, { title: \"Email Id\" }, { title: \"Account Type\" }, { title: \"Customer Type\" }, { title: \"Created Date\" }, { title: \"Expiry Date\" }, { title: \"Status\" }, { title: \"Available Credits\" }, { title: \"User Account Type\" }, { title: \"Provider\" }],\n    columnDefs: [{\n      targets: [4],\n      visible: false,\n      searchable: false\n    }]\n  });\n\n  //To download list user table data in cvs and xlsx format\n\n  // document.getElementById(\"downloadBtn\").addEventListener(\"click\", function () {\n  //   // Convert table data to desired format (CSV or XLSX)\n  //   var table = document.getElementById(\"misTable\");\n  //   var tableData = new Array();\n  //   for (var i = 0, row; (row = table.rows[i]); i++) {\n  //     var rowData = new Array();\n  //     for (var j = 0, col; (col = row.cells[j]); j++) {\n  //       rowData.push(col.textContent.trim());\n  //     }\n  //     tableData.push(rowData.join(\",\"));\n  //   }\n  //   // Convert to CSV or XLSX using SheetJS\n  //   var wb = XLSX.utils.book_new();\n  //   wb.SheetNames.push(\"Table Data\");\n  //   var wsData = XLSX.utils.aoa_to_sheet(\n  //     tableData.map((row) => row.split(\",\"))\n  //   );\n  //   wb.Sheets[\"Table Data\"] = wsData;\n  //   var wbout = XLSX.write(wb, { bookType: \"xlsx\", type: \"array\" });\n  //   // Trigger download\n  //   saveAs(\n  //     new Blob([wbout], { type: \"application/octet-stream\" }),\n  //     \"table_data.xlsx\"\n  //   );\n  // });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n\n  console.log(data.data.listUserFormDataGrid.length);\n  if (data.data.listUserFormDataGrid.length < 10) {\n    $(\"#pageNext\").hide();\n  } else {\n    var pageNumbers = data.data.totalPageCount;\n    $(\"#pageNumber\").val(pageNumbers);\n    $(\"#pageNext\").show();\n  }\n  if (data.data.totalPageCount == 1) {\n    $(\"#pagePrev\").hide();\n  } else {\n    $(\"#pagePrev\").show();\n  }\n};\n\nconst now = moment(new Date()).format(\"DD-MM-YYYY\");\n\n$(() => {\n  $(\"#controls-form\").submit(function (e) {\n    e.preventDefault();\n\n    const data = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      userName: $(\".\" + this[0].value).val(),\n      pageNumber: 1\n    };\n\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"searchExternalUser\"), \"POST\", data, {\n      showMainLoader: true\n    }).done(data => {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 10 * 60 * 1000\n      });\n      renderDetailedMis(data);\n    });\n  });\n\n  $(\"#resetBtn\").click(function (e) {\n    e.preventDefault();\n    $(\"#controls-form\")[0].reset();\n\n    $(\"#view-external-user .adminNameDiv\").addClass(\"d-none\");\n    $(\"#view-external-user .clientNameDiv\").addClass(\"d-none\");\n    $(\"#view-external-user .sellerNameDiv\").addClass(\"d-none\");\n    $(\"#view-external-user .resellerNameDiv\").addClass(\"d-none\");\n\n    listUser();\n  });\n});\n\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  pageNumber: 1\n};\n\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"listUser\"), \"POST\", data).done(data => {\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    renderDetailedMis(data);\n    const source = app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({\n      id: o.userName,\n      name: o.userName\n    }));\n    $(\"#userName\").attr(\"autocomplete\", \"off\").typeahead({ source });\n  }\n});\n\n// list user functionality\n\n$(\"#pageNext\").click(() => {\n  var value = $(\"#pageNumber\").val();\n  var pageNextvalue = parseInt(value) + 1;\n  $(\"#pageNumber\").val(pageNextvalue);\n  listUser();\n});\n$(\"#pagePrev\").click(() => {\n  var value = $(\"#pageNumber\").val();\n  var pageNumber = parseInt(value) - 1;\n  $(\"#pageNumber\").val(pageNumber);\n\n  listUser();\n});\n\nfunction listUser() {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    pageNumber: $(\"#pageNumber\").val()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"listUser\"), \"POST\", data).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      renderDetailedMis(data);\n      const source = app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({\n        id: o.userName,\n        name: o.userName\n      }));\n      $(\"#userName\").attr(\"autocomplete\", \"off\").typeahead({ source });\n    }\n  });\n}\n\n$(\"#view-external-user .dropdown\").on(\"change\", function () {\n  var value = this.value;\n\n  switch (value) {\n    case \"adminName\":\n      {\n        $(\"#view-external-user .adminNameDiv\").removeClass(\"d-none\");\n        $(\"#view-external-user .clientNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .sellerNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .resellerNameDiv\").addClass(\"d-none\");\n        break;\n      }\n\n    case \"resellerName\":\n      {\n        $(\"#view-external-user .adminNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .clientNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .sellerNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .resellerNameDiv\").removeClass(\"d-none\");\n        break;\n      }\n\n    case \"clientName\":\n      {\n        $(\"#view-external-user .adminNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .clientNameDiv\").removeClass(\"d-none\");\n        $(\"#view-external-user .sellerNameDiv\").addClass(\"d-none\");\n        $(\"#view-external-user .resellerNameDiv\").addClass(\"d-none\");\n        break;\n      }\n  }\n});\n\nloadallUserDropdown();\n\nfunction loadallUserDropdown() {\n  const getUserData = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    userId: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getUserid()\n  };\n\n  var userSelect = document.querySelector(\"#view-external-user .userType\");\n  var adminSelect = document.querySelector(\"#view-external-user .adminName\");\n  var resellerSelect = document.querySelector(\"#view-external-user .resellerName\");\n  var sellerName = document.querySelector(\"#view-external-user .sellerNameDiv .sellerName\");\n  var clientName = document.querySelector(\"#view-external-user .clientName\");\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllChildForUser\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert(\"close\");\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n\n    const userTypes = Object.keys(data.data.userAllChildMap);\n    console.log(userTypes);\n    // $.each(aList, function (key, value) {\n    //   userSelect.options[adminSelect.options.length] = new Option(key, key);\n    // });\n    userSelect.options.length = 1;\n\n    const allChildMap = data.data.userAllChildMap;\n    const aList = allChildMap.ADMIN;\n    var countKey = Object.keys(aList).length;\n    if (countKey === 0) {\n      $(\".adminNameDiv\").addClass(\"d-none\");\n    } else {\n      userSelect.options[userSelect.options.length] = new Option(\"Admin\", \"adminName\");\n    }\n    adminSelect.options.length = 1;\n    $.each(aList, function (key, value) {\n      adminSelect.options[adminSelect.options.length] = new Option(key, key);\n    });\n\n    const rList = allChildMap.RESELLER;\n    var countKey = Object.keys(rList).length;\n    if (countKey === 0) {\n      $(\".resellerNameDiv\").addClass(\"d-none\");\n    } else {\n      userSelect.options[userSelect.options.length] = new Option(\"Reseller\", \"resellerName\");\n    }\n    resellerSelect.options.length = 1;\n    $.each(rList, function (key, value) {\n      resellerSelect.options[resellerSelect.options.length] = new Option(key, key);\n    });\n\n    const sList = allChildMap.SELLER;\n    var countKey = Object.keys(sList).length;\n    if (countKey == 0) {\n      $(\".sellerNameDiv\").addClass(\"d-none\");\n    } else {\n      userSelect.options[userSelect.options.length] = new Option(\"Seller\", \"sellerName\");\n    }\n    sellerName.options.length = 1;\n    $.each(sList, function (key, value) {\n      sellerName.options[sellerName.options.length] = new Option(key, key);\n    });\n\n    const cList = allChildMap.CLIENT;\n    var countKey = Object.keys(cList).length;\n    if (countKey == 0) {\n      $(\".clientNameDiv\").addClass(\"d-none\");\n    } else {\n      userSelect.options[userSelect.options.length] = new Option(\"Client\", \"clientName\");\n    }\n    clientName.options.length = 1;\n    $.each(cList, function (key, value) {\n      clientName.options[clientName.options.length] = new Option(key, key);\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/list-user/index.js?");

/***/ }),

/***/ "./src/layouts/list-user/styles.css":
/*!******************************************!*\
  !*** ./src/layouts/list-user/styles.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/list-user/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/list-user/styles.css?");

/***/ })

/******/ });