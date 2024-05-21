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
/******/ 		"routing": 0
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
/******/ 	deferredModules.push(["./src/layouts/routing/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/routing/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/routing/styles.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".select2-container{\\n  width: 100% !important;\\n  }\\n.dataTables_info{\\n  display: none;\\n}\\n\\ntable tr.routingTh{\\n  background-color: gainsboro;\\n}\\ntable tr.routingTh td{\\n  font-weight: 600;\\n}\\n\\ntable td button,table td .editModal{\\n  border-radius: 5px !important;\\n}\\ntable.table td{\\n  padding: 5px !important;\\n  line-height: 2.5 !important;\\n}\\n/*table.table td.tdHead{\\n  /* padding-left: 15px !important; }*/\\n\\ntable.table td{\\n  padding-left: 15px !important;\\n}\\n#circleLabel,#operatorLabel,#senderIdLabel,#groupLabel{\\n  font-size: smaller;\\n    padding-left: 5px;\\n    color: gray;\\n}\\ntr.routingTh.toggle .fa-minus-square:before {\\n  content: \\\"\\\\F0FE\\\" !important;\\n}\\n[data-toggle=\\\"toggle\\\"] {\\n\\tdisplay: none;\\n}\\n/* th.dt-center, td.dt-center { text-align: center; } */\\n/* .table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_length,#misTable_filter,#misTable_info,#misTable_paginate{\\ndisplay:none;\\n} */\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/routing/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/routing/index.js":
/*!**************************************!*\
  !*** ./src/layouts/routing/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/routing/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\n// console.log(\"Add Logo\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(document).ready(function () {\n  $('.select2').select2();\n});\n\nvar circleList = null;\nvar operatorList = null;\nvar senderIdList = null;\nvar groupList = null;\n\nloadRoutes(\"view-routing-form\");\nloadCircles();\nloadOperators();\nloadSenderID();\nloadGroups();\n\nfunction loadRoutes(containerID) {\n  var adminSelect = document.querySelector(\"#\" + containerID + \" .adminName\");\n  var resellerSelect = document.querySelector(\"#\" + containerID + \" .resellerName\");\n  var sellerSelect = document.querySelector(\"#\" + containerID + \" .sellerName\");\n  var clientSelect = document.querySelector(\"#\" + containerID + \" .clientName\");\n\n  const getUserData = {\n    \"loggedInUsername\": _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    \"userId\": _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getUserid()\n    // \"userRole\":\"admin\",// optional\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllChildForUser\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n    const allChildMap = data.data.userAllChildMap;\n    const aList = allChildMap.ADMIN;\n    // console.log(\"<0></0>\");\n    var countKey = Object.keys(aList).length;\n    if (countKey === 0) {\n      $(\".adminNameDiv\").addClass('d-none');\n    } else {\n      $(\".adminNameDiv\").removeClass('d-none');\n    }\n    adminSelect.options.length = 1;\n    $.each(aList, function (key, value) {\n      adminSelect.options[adminSelect.options.length] = new Option(key, value);\n    });\n    const rList = allChildMap.RESELLER;\n    var countKey2 = Object.keys(rList).length;\n    // console.log(\"rList \" + countKey);\n    if (countKey2 === 0) {\n      $(\".resellerNameDiv\").addClass('d-none');\n    } else {\n      $(\".resellerNameDiv\").removeClass('d-none');\n    }\n    resellerSelect.options.length = 1;\n    // resellerSelect.options[resellerSelect.options.length] = new Option(\"All\", \"0\");\n    $.each(rList, function (key, value) {\n      resellerSelect.options[resellerSelect.options.length] = new Option(key, value);\n    });\n\n    const sList = allChildMap.SELLER;\n    var countKey3 = Object.keys(sList).length;\n    if (countKey3 == 0) {\n      $(\".sellerNameDiv\").addClass('d-none');\n    } else {\n      $(\".sellerNameDiv\").removeClass('d-none');\n    }\n    sellerSelect.options.length = 1;\n    // sellerSelect.options[sellerSelect.options.length] = new Option(\"All\", \"0\");\n    $.each(sList, function (key, value) {\n      sellerSelect.options[sellerSelect.options.length] = new Option(key, value);\n    });\n\n    const cList = allChildMap.CLIENT;\n    var countKey4 = Object.keys(cList).length;\n    if (countKey4 == 0) {\n      $(\".clientNameDiv\").addClass('d-none');\n    } else {\n      $(\".clientNameDiv\").removeClass('d-none');\n    }\n    clientSelect.options.length = 1;\n    // clientSelect.options[clientSelect.options.length] = new Option(\"All\", \"0\");\n    $.each(cList, function (key, value) {\n      clientSelect.options[clientSelect.options.length] = new Option(key, value);\n    });\n  });\n}\n\n$(\".dropdown.adminName\").on('change', function () {\n  dropdownChange(\"view-routing-form\", this.value, \"admin\");\n});\n\n$(\".dropdown.resellerName\").on('change', function () {\n  dropdownChange(\"view-routing-form\", this.value, \"reseller\");\n});\n\n$(\".dropdown.sellerName\").on('change', function () {\n  dropdownChange(\"view-routing-form\", this.value, \"seller\");\n});\n\nfunction dropdownChange(containerID, value, parent) {\n  // const containerID = \"view-routing-form\";\n  var adminSelect = document.querySelector(\"#\" + containerID + \" .adminName\");\n  var resellerSelect = document.querySelector(\"#\" + containerID + \" .resellerName\");\n  var sellerSelect = document.querySelector(\"#\" + containerID + \" .sellerName\");\n  var clientSelect = document.querySelector(\"#\" + containerID + \" .clientName\");\n\n  if (value == 0) {\n    return null;\n  }\n\n  // const userRole = $(this).attr(\"data-name\");\n  const getUserData = {\n    \"loggedInUsername\": _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    \"userId\": value\n    // \"userRole\": $(this).attr(\"data-name\"),// optional\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllChildForUser\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n\n    const allData = data.data.userAllChildMap;\n    const rList = allData.RESELLER;\n    const sList = allData.SELLER;\n    const cList = allData.CLIENT;\n\n    // var countKey = Object.keys(rList).length;\n    // if (countKey === 0) {\n    //   $(\"#view-routing-form .resellerNameDiv\").addClass('d-none');\n    // }\n    // else{\n    //   $(\"#view-routing-form .resellerNameDiv\").removeClass('d-none');\n    // }\n\n    if (parent === \"admin\" || parent === null) {\n      if (Object.keys(rList).length != 0) {\n        resellerSelect.options.length = 1;\n        // resellerSelect.options[resellerSelect.options.length] = new Option(\"All\", \"0\");\n        $.each(rList, function (key, value) {\n          resellerSelect.options[resellerSelect.options.length] = new Option(key, value);\n        });\n      } else {\n        resellerSelect.options.length = 1;\n      }\n\n      if (Object.keys(sList).length == 0) {\n        sellerSelect.options.length = 1;\n      }\n\n      if (Object.keys(cList).length == 0) {\n        clientSelect.options.length = 1;\n      }\n    }\n\n    // var countKey = Object.keys(sList).length;\n    // console.log(\"sList \" + countKey);\n    // if (countKey === 0) {\n    //   $(\"#view-routing-form .sellerNameDiv\").addClass('d-none');\n    // }\n    // else{\n    //   $(\"#view-routing-form .sellerNameDiv\").removeClass('d-none');\n    // }\n    if (parent === \"admin\" || parent === \"reseller\" || parent === null) {\n      if (Object.keys(sList).length != 0) {\n        sellerSelect.options.length = 1;\n        // sellerSelect.options[sellerSelect.options.length] = new Option(\"All\", \"0\");\n        $.each(sList, function (key, value) {\n          sellerSelect.options[sellerSelect.options.length] = new Option(key, value);\n        });\n      } else {\n        sellerSelect.options.length = 1;\n      }\n\n      if (Object.keys(cList).length == 0) {\n        clientSelect.options.length = 1;\n      }\n    }\n\n    // var countKey = Object.keys(cList).length;\n\n    // if (countKey === 0) {\n    //   $(\"#view-routing-form .clientNameDiv\").addClass('d-none');\n    // }\n    // else{\n    //   $(\"#view-routing-form .clientNameDiv\").removeClass('d-none');\n    // }\n    if (parent === \"admin\" || parent === \"seller\" || parent === null) {\n\n      if (Object.keys(cList).length != 0) {\n        clientSelect.options.length = 1;\n        // clientSelect.options[clientSelect.options.length] = new Option(\"All\", \"0\");\n        $.each(cList, function (key, value) {\n          clientSelect.options[clientSelect.options.length] = new Option(key, value);\n        });\n      } else {\n        clientSelect.options.length = 1;\n      }\n    }\n  });\n}\n\n$(\"#resetButton\").on('click', function () {\n  dropdownChange(\"view-routing-form\", _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getUserid());\n});\n\nfunction populateTable(data) {\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllRoutingForUser\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n\n    const grid = (data.data || {}).userRoutingDataList || [];\n\n    const getHeading = key => {\n      let result = key.replace(/([A-Z])/g, \" $1\");\n      return result.charAt(0).toUpperCase() + result.slice(1);\n    };\n    const headerRow = grid[0];\n    let tableHeader = [];\n    let formattedTableHeader = [];\n\n    for (let key in headerRow) {\n      if (headerRow.hasOwnProperty(key)) {\n        tableHeader.push(key);\n        formattedTableHeader.push(getHeading(key));\n      }\n    }\n    formattedTableHeader.push(\"Action\");\n\n    let tabData = grid.map(row => {\n      var rowData = [];\n      tableHeader.forEach(key => {\n        rowData.push(row[key] || \"-\");\n      });\n      return rowData;\n    });\n\n    const transRouting = (data.data || {}).transRoutingDataList || [];\n    const promoRouting = (data.data || {}).promoRoutingDataList || [];\n    const transPromoDndRouting = (data.data || {}).transPromoDndRoutingDataList || [];\n    const transPromoNonDndRouting = (data.data || {}).transPromoNonDndRoutingDataList || [];\n\n    $(\"#routingTableView\").html(table({\n      id: \"routingTable\",\n      formattedTableHeader: formattedTableHeader,\n      // tableData: tabData,\n      transRoutingData: transRouting,\n      transPromoDndRoutingData: transPromoDndRouting,\n      transPromoNonDndRoutingData: transPromoNonDndRouting,\n      promoRoutingData: promoRouting\n    })).promise().done(function () {\n      $('[data-toggle=\"toggle\"]').change(function () {\n        $(this).parents().next('.hide').toggle();\n        $(this).parents('.routingTh').toggleClass(\"toggle\");\n      });\n\n      $(\"#routingTable\").find('tr.routingRow').each(function (i, el) {\n        var $tds = $(this).find('td'),\n            circleId = $tds.eq(0).text(),\n            operatorId = $tds.eq(1).text(),\n            senderId = $tds.eq(2).text(),\n            groupId = $tds.eq(3).text();\n        $tds.eq(0).attr(\"data-id\", circleList[circleId]);\n        $tds.eq(1).attr(\"data-id\", operatorList[operatorId]);\n        $tds.eq(2).attr(\"data-id\", senderIdList[senderId]);\n        $tds.eq(3).attr(\"data-id\", groupList[groupId]);\n      });\n\n      updateEditDeleteEvent();\n      $(\".saveRouting\").click(function (e) {\n        var rType = $(this).closest('button').attr(\"name\");\n        var reqData = [];\n        // console.log(rType);\n        $(\"#routingTable\").find('tr.' + rType).each(function (i, el) {\n          // console.log(\"entry point\");\n          let row = {};\n          var $tds = $(this).find('td'),\n              circleId = $tds.eq(0).data(\"id\"),\n              operatorId = $tds.eq(1).data(\"id\"),\n              senderId = $tds.eq(2).data(\"id\"),\n              groupId = $tds.eq(3).data(\"id\");\n          row[\"circleId\"] = circleId;\n          row[\"operatorId\"] = operatorId;\n          row[\"senderId\"] = senderId;\n          row[\"groupId\"] = groupId;\n          reqData.push(row);\n        });\n        // console.log(reqData);\n\n        const getUserData = {\n          loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n          adminId: $(\".adminName\").val(),\n          resellerId: $(\".resellerName\").val(),\n          idOfsenderId: $(\".sellerName\").val(),\n          clientId: $(\".clientName\").val(),\n          routingType: rType,\n          userRoutingDataList: reqData\n        };\n\n        Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"updateRoutingForUser\"), \"POST\", getUserData, {\n          showMainLoader: true\n        }).done(data => {\n          // console.log(data);\n          if (data.message) {\n            $(\".alert\").alert('close');\n            _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n              clearTime: 5 * 1000\n            });\n          }\n        });\n      });\n    });\n  });\n  // console.log(data);\n}\n\nconst data = {\n  loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  resellerId: \"\",\n  sellerId: \"\",\n  clientId: \"\"\n};\npopulateTable(data);\n\n$(\"#btnSubmit\").click(function (e) {\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    resellerId: $(\".adminName\").val(),\n    resellerId: $(\".resellerName\").val(),\n    sellerId: $(\".sellerName\").val(),\n    clientId: $(\".clientName\").val()\n  };\n  populateTable(data);\n});\n\nfunction loadCircles() {\n  var circleSelect = document.querySelector(\".circle\");\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllCircleList\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      circleList = data.data.circleAndIdMap;\n      circleSelect.options.length = 1;\n      circleSelect.options[circleSelect.options.length] = new Option(\"All\", \"0\");\n      $.each(circleList, function (key, value) {\n        circleSelect.options[circleSelect.options.length] = new Option(key, value);\n        // circleSelect.options[circleSelect.options.length] = new Option(key, key);\n      });\n    }\n    data;\n  });\n};\n\nfunction loadOperators() {\n  var operatorSelect = document.querySelector(\".operator\");\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllOperatorList\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      operatorList = data.data.operatorAndIdMap;\n      operatorSelect.options.length = 1;\n      operatorSelect.options[operatorSelect.options.length] = new Option(\"All\", \"0\");\n      $.each(operatorList, function (key, value) {\n        operatorSelect.options[operatorSelect.options.length] = new Option(key, value);\n        // operatorSelect.options[operatorSelect.options.length] = new Option(key, key);\n      });\n    }\n    data;\n  });\n};\n\nfunction loadSenderID() {\n  var senderIDSelect = document.querySelector(\".senderId\");\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserSenderIdList\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      senderIdList = data.data.userSenderIdMap;\n      senderIDSelect.options.length = 1;\n      senderIDSelect.options[senderIDSelect.options.length] = new Option(\"All\", \"0\");\n      $.each(senderIdList, function (key, value) {\n        senderIDSelect.options[senderIDSelect.options.length] = new Option(key, value);\n        // senderIDSelect.options[senderIDSelect.options.length] = new Option(key, key);\n      });\n    }\n    // (data);\n  });\n};\n\nfunction loadGroups() {\n  var groupSelect = document.querySelector(\".group\");\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserRoutingGroups\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      groupList = data.data.userGroupAndGroupIdMap;\n      groupSelect.options.length = 1;\n      // groupSelect.options[groupSelect.options.length] = new Option(\"All\", \"0\");\n      $.each(groupList, function (key, value) {\n        groupSelect.options[groupSelect.options.length] = new Option(key, value);\n        // groupSelect.options[groupSelect.options.length] = new Option(key, key);\n      });\n    }\n    // (data);\n  });\n};\n\n$('#myModal').on('hidden.bs.modal', function (e) {\n  // do something...\n  // console.log(\"on hide\");\n  // $(\"#routingTable\").find(\"tr.editRow\").remove();\n});\n\nfunction updateEditDeleteEvent() {\n  $(\".deleteRow\").click(function (e) {\n    $(this).closest('tr').remove();\n  });\n\n  $(\".editModal\").click(function (e) {\n    var rType = $(this).closest('button').attr(\"name\");\n    // console.log(rType);\n    $(\"#routingTypeData\").html(rType);\n    $('#myModal').modal('show');\n\n    $(this).closest('tr').addClass(\"editRow\");\n\n    var $tds = $(this).closest('tr').find('td');\n    // console.log($(this).closest('tr').find('td:first-child').text());\n\n    // $(\"#circleLabel1\").html($tds.eq(1).text());\n    // $(\"#operatorLabel1\").html($tds.eq(2).text());\n    // $(\"#senderIdLabel1\").html($tds.eq(3).text());\n    // $(\"#groupLabel1\").html($tds.eq(4).text());\n\n    $(\"#circle option\").filter(function () {\n      return this.text == $tds.eq(0).text();\n    }).attr('selected', true);\n\n    $(\"#operator option\").filter(function () {\n      return this.text == $tds.eq(1).text();\n    }).attr('selected', true);\n\n    $(\"#senderId option\").filter(function () {\n      return this.text == $tds.eq(2).text();\n    }).attr('selected', true);\n\n    $(\"#group option\").filter(function () {\n      return this.text == $tds.eq(3).text();\n    }).attr('selected', true);\n  });\n\n  $(\".addModal\").click(function (e) {\n    var rType = $(this).closest('button').attr(\"name\");\n    // console.log(rType);\n    $(\"#routingTypeData\").html(rType);\n    $('#myModal').modal('show');\n    $(\"#circleLabel\").html(\"\");\n    $(\"#operatorLabel\").html(\"\");\n    $(\"#senderIdLabel\").html(\"\");\n    $(\"#groupLabel\").html(\"\");\n  });\n}\n\n$('#update').on('click', function () {\n\n  // $(\"#routingTable\").find(\"tr.editRow\").remove();\n  // console.log($(\"#routingTable\").find(\"tr.editRow\").length);\n\n  var editrowCount = $(\"#routingTable\").find(\"tr.editRow\").length;\n  if (parseInt(editrowCount) === 1) {\n    // console.log(\"return\");\n    $(\"#routingTable\").find(\"tr.editRow\").remove();\n  }\n  // console.log(\"no return\");\n  // var myTable = $('#example1').DataTable();\n  var transLength = $('#routingTable').find('tr.TRANS').length;\n  var promoLength = $('#routingTable').find('tr.PROMO').length;\n  var transPromoDndLength = $('#routingTable').find('tr.TRANS_PROMO_DND').length;\n  var transPromoNonDndLength = $('#routingTable').find('tr.TRANS_PROMO_NON_DND').length;\n  var rType = $(\"#routingTypeData\").html();\n  var i = 0;\n  // console.log(rType);\n  if (rType == \"TRANS\") {\n    i = transLength;\n  } else if (rType == \"PROMO\") {\n    i = parseInt(transLength) + parseInt(promoLength) + 1;\n  } else if (rType == \"TRANS_PROMO_DND\") {\n    i = parseInt(transLength) + parseInt(promoLength) + parseInt(transPromoDndLength) + 2;\n  } else if (rType == \"TRANS_PROMO_NON_DND\") {\n    i = parseInt(transLength) + parseInt(promoLength) + parseInt(transPromoDndLength) + parseInt(transPromoNonDndLength) + 3;\n  }\n  // console.log(i);\n  // console.log($(\"#circle\").children(\"option:selected\").text());\n  var html = \"<tr class=\" + $(\"#routingTypeData\").html() + \">\" +\n  //    \"<td>\" + $(\"#routingTypeData\").html() + \"</td>\" +\n  \"<td data-id=\" + $(\"#circle\").val() + \">\" + $(\"#circle\").children(\"option:selected\").text() + \"</td>\" + \"<td data-id=\" + $(\"#operator\").val() + \">\" + $(\"#operator\").children(\"option:selected\").text() + \"</td>\" + \"<td data-id=\" + $(\"#senderId\").val() + \">\" + $(\"#senderId\").children(\"option:selected\").text() + \"</td>\" + \"<td data-id=\" + $(\"#group\").val() + \">\" + $(\"#group\").children(\"option:selected\").text() + \"</td>\" + '<td><a data-toggle=\"modal\" class=\"btn btn-outline-primary btn-sm editModal\" href=\"#myModal\">' + '<i class=\"fa fa-pencil\"></i>' + '</a> &nbsp;&nbsp;&nbsp;' + '<button type=\"button\" class=\"btn btn-outline-danger btn-sm deleteRow\">' + '<i class=\"fa fa-trash\"></i>' + '</button>' + \"</td>\";\n  $('#routingTable > tbody > tr').eq(i).after(html).promise().done(function () {\n    updateEditDeleteEvent();\n  });\n});\n\n//# sourceURL=webpack:///./src/layouts/routing/index.js?");

/***/ }),

/***/ "./src/layouts/routing/styles.css":
/*!****************************************!*\
  !*** ./src/layouts/routing/styles.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/routing/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/routing/styles.css?");

/***/ })

/******/ });