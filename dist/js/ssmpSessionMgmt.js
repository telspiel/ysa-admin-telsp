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
/******/ 		"ssmpSessionMgmt": 0
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
/******/ 	deferredModules.push(["./src/layouts/ssmp-session-mgmt/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/ssmp-session-mgmt/styles.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/ssmp-session-mgmt/styles.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_length,#misTable_filter,#misTable_info,#misTable_paginate{\\n//display:none;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/ssmp-session-mgmt/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/ssmp-session-mgmt/index.js":
/*!************************************************!*\
  !*** ./src/layouts/ssmp-session-mgmt/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/ssmp-session-mgmt/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\n// console.log(\"List User\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nconst renderDetailedMis = data => {\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n\n  // const grid = (data.data || {}).listUserFormDataGrid || [];\n\n  // const grid = data.smppResult\n\n  // const grid = JSON.parse(\"{\\\"demosmpp4\\\":{\\\"sessionStatsDetails\\\":{\\\"rxSessionDetailsList\\\":[],\\\"trxSessionDetailsList\\\":[{\\\"bindType\\\":\\\"TRANSCEIVER\\\",\\\"bindStatus\\\":\\\"BOUND\\\",\\\"bindTime\\\":\\\"2022-07-26 14:08:56\\\",\\\"remoteAdd\\\":\\\"115.112.190.41\\\",\\\"isAlive\\\":\\\"true\\\"},{\\\"bindType\\\":\\\"TRANSCEIVER\\\",\\\"bindStatus\\\":\\\"BOUND\\\",\\\"bindTime\\\":\\\"2022-07-26 14:08:56\\\",\\\"remoteAdd\\\":\\\"115.112.190.41\\\",\\\"isAlive\\\":\\\"true\\\"}],\\\"txSessionDetailsList\\\":[]},\\\"sessionStats\\\":{\\\"trxSessionCount\\\":2,\\\"totalDelivered\\\":0,\\\"totalSubmit\\\":0,\\\"submitTps\\\":0.0,\\\"rxSessionCount\\\":0,\\\"txSessionCount\\\":0,\\\"deliverTps\\\":0.0},\\\"username\\\":\\\"demosmpp4\\\"}}\")\n\n  const grid = data.smppResult;\n\n  //  const grid = JSON.parse(data.data)\n  console.log(grid);\n\n  console.log(typeof grid);\n\n  // get first value of the object\n\n  // check if the object is empty\n\n\n  const smppType1 = Object.keys(grid)[0];\n\n  console.log(smppType1);\n\n  const smppType2 = Object.keys(grid)[1];\n\n  console.log(smppType2);\n\n  const grid1 = Object.values(grid)[0] || {};\n  console.log(grid1);\n  console.log(typeof grid1);\n\n  // add \n\n\n  // get second value of the object\n  const grid2 = Object.values(grid)[1] || {};\n  console.log(grid2);\n  console.log(typeof grid2);\n\n  // // concatenate both strings \n\n  // const grid3 = Object.values(grid)[0] +\"/n\"+ Object.values(grid)[1]\n  // console.log(grid3);\n  // console.log(typeof(grid3));\n\n  // // split the string\n\n  // const grid4 = grid3.split(\"/n\")\n  // console.log(grid4);\n  // console.log(typeof(grid4));\n\n\n  // make object from the string of grid1\n\n\n  const grid5 = JSON.parse(grid1) || {};\n  console.log(grid5);\n  console.log(typeof grid5);\n\n  // Object.keys(grid5).forEach(key => {\n  //   let data = grid5[key];\n  //   console.log(data);\n  //   let row = data.sessionStats;\n  //   console.log(row);\n  //   console.log(typeof(row));\n  //   row['smppType'] = smppType1;\n\n  // }\n  // );\n\n  // add smpptype value inside sessionStats in each object of grid5 \n\n  Object.keys(grid5).forEach(key => {\n    let data = grid5[key];\n    console.log(data);\n    let row = data.sessionStats;\n    console.log(row);\n    console.log(typeof row);\n    row['smppType'] = 'SMPP-1';\n  });\n\n  // make object from the string of grid2\n\n  const grid6 = JSON.parse(grid2) || {};\n  console.log(grid6);\n  console.log(typeof grid6);\n\n  Object.keys(grid6).forEach(key => {\n    let data = grid6[key];\n    console.log(data);\n    let row = data.sessionStats;\n    console.log(row);\n    console.log(typeof row);\n    row['smppType'] = 'SMPP-2';\n  });\n\n  // combine as object of grid5 and grid6\n\n  var grid7 = Object.assign(grid5, grid6) || {};\n  console.log(grid7);\n  console.log(typeof grid7);\n\n  // parse the string to object\n\n  // const grid5 = JSON.parse(grid4)\n  // console.log(grid5);\n  // console.log(typeof(grid5));\n\n\n  //   {\n  //     \"SMPP-83.136.248.245:4081\": \"{\\\"demosmpp3\\\":{\\\"sessionStatsDetails\\\":{\\\"rxSessionDetailsList\\\":[],\\\"trxSessionDetailsList\\\":[{\\\"bindType\\\":\\\"TRANSCEIVER\\\",\\\"bindStatus\\\":\\\"BOUND\\\",\\\"bindTime\\\":\\\"2022-07-26 14:15:40\\\",\\\"remoteAdd\\\":\\\"115.112.190.41\\\",\\\"isAlive\\\":\\\"true\\\"}],\\\"txSessionDetailsList\\\":[]},\\\"sessionStats\\\":{\\\"trxSessionCount\\\":1,\\\"totalDelivered\\\":0,\\\"totalSubmit\\\":0,\\\"submitTps\\\":0.0,\\\"rxSessionCount\\\":0,\\\"txSessionCount\\\":0,\\\"deliverTps\\\":0.0},\\\"username\\\":\\\"demosmpp3\\\"}}\",\n  //     \"SMPP-94.237.121.119:4081\": \"{\\\"demosmpp4\\\":{\\\"sessionStatsDetails\\\":{\\\"rxSessionDetailsList\\\":[],\\\"trxSessionDetailsList\\\":[{\\\"bindType\\\":\\\"TRANSCEIVER\\\",\\\"bindStatus\\\":\\\"BOUND\\\",\\\"bindTime\\\":\\\"2022-07-26 14:08:56\\\",\\\"remoteAdd\\\":\\\"115.112.190.41\\\",\\\"isAlive\\\":\\\"true\\\"},{\\\"bindType\\\":\\\"TRANSCEIVER\\\",\\\"bindStatus\\\":\\\"BOUND\\\",\\\"bindTime\\\":\\\"2022-07-26 14:08:56\\\",\\\"remoteAdd\\\":\\\"115.112.190.41\\\",\\\"isAlive\\\":\\\"true\\\"}],\\\"txSessionDetailsList\\\":[]},\\\"sessionStats\\\":{\\\"trxSessionCount\\\":2,\\\"totalDelivered\\\":0,\\\"totalSubmit\\\":0,\\\"submitTps\\\":0.0,\\\"rxSessionCount\\\":0,\\\"txSessionCount\\\":0,\\\"deliverTps\\\":0.0},\\\"username\\\":\\\"demosmpp4\\\"}}\"\n  //   }\n\n\n  // // convert to string\n\n  //   const gridString = JSON.stringify(grid);\n  //   console.log(gridString);\n\n  // // remove the first and last bracket\n\n  //   const gridString2 = gridString.substring(1, gridString.length - 1);\n  //   console.log(gridString2);\n\n  // // remove text after smpp\n\n\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n\n  let headerRow;\n  let tableHeader = [];\n  let formattedTableHeader = [];\n\n  // add smpp type to the header \n\n  tableHeader.push(\"smppType\");\n  formattedTableHeader.push(\"smppType\");\n\n  Object.keys(grid7).forEach(key => {\n    let data = grid7[key];\n    console.log(data);\n    let row = data.sessionStats;\n    console.log(row);\n    console.log(typeof row);\n    row['username'] = data.username;\n\n    headerRow = row;\n    for (let key in headerRow) {\n      if (headerRow.hasOwnProperty(key)) {\n        tableHeader.push(key);\n        formattedTableHeader.push(getHeading(key));\n      }\n    }\n  });\n\n  // add smpp type to table data\n\n\n  // console.log(tabData);\n\n  let tabData = Object.keys(grid7).map(row => {\n\n    var rowData = [];\n    console.log(grid7[row]);\n    tableHeader.forEach(key => {\n      // rowData.push(grid[row].sessionStats[key] || \"0\")\n      rowData[key] = grid7[row].sessionStats[key] || \"0\";\n    });\n    return rowData;\n  });\n  console.log(tabData);\n\n  // add smpp type to table data\n\n\n  console.log(tableHeader);\n\n  console.log(formattedTableHeader);\n\n  console.log(tabData);\n\n  if ($.fn.dataTable.isDataTable('#misTable')) {\n    $('#misTable').DataTable().destroy();\n  }\n  let table = $('#misTable').DataTable({\n    data: tabData,\n    paging: true,\n    searching: true,\n    \"bPaginate\": false,\n    \"bLengthChange\": true,\n    \"bFilter\": true,\n    \"bInfo\": true,\n    \"bAutoWidth\": false,\n    columns: [{ title: \"Client Name\", data: \"username\" }, { title: \"SMPP\", data: \"smppType\" }, { title: \"Tx\", data: 'txSessionCount' }, { title: \"Rx\", data: 'rxSessionCount' }, { title: \"TRx\", data: 'trxSessionCount' }, { title: \"Submit Tps\", data: 'submitTps' }, { title: \"Deliver Tps\", data: 'deliverTps' }, { title: \"action\" }, { title: \"action2\" }],\n    \"columnDefs\": [{\n      \"targets\": -2,\n      \"data\": null,\n      \"defaultContent\": \"<button class='btn btn-info showDetail'>Show Detail</button>\"\n    }, {\n      \"targets\": -1,\n      \"data\": null,\n      \"defaultContent\": \"<button class='btn btn-info unBind'>Unbind</button>\"\n    }]\n  });\n\n  $('#misTable tbody').on('click', 'button.unBind', function () {\n    const data = {\n      username: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n    };\n    var datas = table.row($(this).parents('tr')).data();\n    console.log(datas['username']);\n    console.log(datas);\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"unbindUserSession\") + \"/\" + datas['username'], \"POST\", {}).done(data => {\n      console.log(data.data);\n      if (data.data) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.data, {\n          clearTime: 5 * 1000\n        });\n      }\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {}\n    });\n  });\n\n  $('#misTable tbody').on('click', 'button.showDetail', function () {\n    var data = table.row($(this).parents('tr')).data();\n    $('#tableModal').modal('show');\n    let listArray = grid7[data['username']].sessionStatsDetails;\n    let tx = listArray.txSessionDetailsList;\n    let rx = listArray.rxSessionDetailsList;\n    let trx = listArray.trxSessionDetailsList;\n\n    // let length = parseInt(data['txSessionCount']) + parseInt(data['rxSessionCount']) + parseInt(data['trxSessionCount']);\n    // console.log(length);\n    let largeCount = Math.max(data['txSessionCount'], data['rxSessionCount'], data['trxSessionCount']);\n    if (largeCount != 0) {\n      let testArr = parseInt(data['txSessionCount']) == largeCount ? tx : parseInt(data['rxSessionCount']) == largeCount ? rx : trx;\n      const headerRow = testArr[0];\n      let tableHeader = [];\n\n      for (let key in headerRow) {\n        if (headerRow.hasOwnProperty(key)) {\n          tableHeader.push(key);\n        }\n      }\n      if (tx.length != 0) {\n        $(\".txSessionDetailsList\").removeClass(\"d-none\");\n        renderDetailTable(\"txSessionDetailsList\", tableHeader, tx);\n      }\n      if (rx.length != 0) {\n        $(\".rxSessionDetailsList\").removeClass(\"d-none\");\n        renderDetailTable(\"rxSessionDetailsList\", tableHeader, rx);\n      }\n      if (trx.length != 0) {\n        $(\".trxSessionDetailsList\").removeClass(\"d-none\");\n        renderDetailTable(\"trxSessionDetailsList\", tableHeader, trx);\n      }\n    }\n  });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#pageNext\").show();\n  } else {\n    $(\"#pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#pagePrev\").show();\n  } else {\n    $(\"#pagePrev\").hide();\n  }\n};\n\nconst renderDetailTable = (id, tableHeader, session) => {\n\n  const tableData = session.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData[key] = row[key] || \"0\";\n    });\n    return rowData;\n  });\n\n  if ($.fn.dataTable.isDataTable('#' + id)) {\n    $('#' + id).DataTable().destroy();\n  }\n  $('#' + id).DataTable({\n    data: tableData,\n    paging: false,\n    searching: false,\n    \"bPaginate\": false,\n    \"bLengthChange\": false,\n    \"bFilter\": true,\n    \"bInfo\": false,\n    \"bAutoWidth\": false,\n    \"columns\": [{ title: \"bind Status\", data: \"bindStatus\" }, { title: \"bind Time\", data: \"bindTime\" }, { title: \"bind Type\", data: \"bindType\" }, { title: \"isAlive\", data: \"isAlive\" }, { title: \"remote Address\", data: \"remoteAdd\" }]\n  });\n};\nconst now = moment(new Date()).format(\"DD-MM-YYYY\");\n\n$(() => {\n  $(\"#controls-form\").submit(function (e) {\n    e.preventDefault();\n  });\n\n  $(\"#pageNext\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    const totalPages = +$(\"#totalPages\").val();\n    if (pageNumber < totalPages) {\n      $(\"#pageNumber\").val(pageNumber + 1);\n      $(\"#controls-form\").submit();\n    }\n  });\n  $(\"#pagePrev\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    if (pageNumber > 1) {\n      $(\"#pageNumber\").val(pageNumber - 1);\n      $(\"#controls-form\").submit();\n    }\n  });\n});\n\nconst data = {\n  username: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n};\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"smppStatus\"), \"POST\", data).done(data => {\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n\n    renderDetailedMis(data);\n    console.log(data);\n    // const source = (app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({\n    //   id: o.userName,\n    //   name: o.userName\n    // })));\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/ssmp-session-mgmt/index.js?");

/***/ }),

/***/ "./src/layouts/ssmp-session-mgmt/styles.css":
/*!**************************************************!*\
  !*** ./src/layouts/ssmp-session-mgmt/styles.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/ssmp-session-mgmt/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/ssmp-session-mgmt/styles.css?");

/***/ })

/******/ });