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
/******/ 		"operatorSummary": 0
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
/******/ 	deferredModules.push(["./src/layouts/operator-summary/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/operator-summary/styles.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/operator-summary/styles.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".accordation-header{\\r\\n    border-bottom: 1px solid #582c4f;\\r\\n    background: #582c6217;\\r\\n}\\r\\n.accordation-header .accordation-title{\\r\\n    padding-top: 15px;\\r\\n}\\r\\n.accordation-header .actions{\\r\\n    padding-top: 10px;\\r\\n    padding-bottom: 5px;\\r\\n}\\r\\n.accordation-header .actions span{\\r\\n    margin-right: 15px;\\r\\n    background-color: #582c4fe0 !important;\\r\\n    border-color: #582c4fe0 !important;\\r\\n}\\r\\n.accordation-header .actions span a{\\r\\n    color: #fff;\\r\\n}\\r\\n.accordation-header .actions span a i{\\r\\n    margin-right: 5px;\\r\\n}\\r\\ntable{\\r\\n    margin : 0 10px;\\r\\n}\\r\\n\\r\\ndiv.accordation-header:hover {\\r\\n    cursor: pointer !important;\\r\\n    background: #582c4f47;\\r\\n}\\r\\n\\r\\ndiv.accordation-header.active {\\r\\n    background: #582c4f47;\\r\\n}\\r\\nth { white-space: nowrap; }\\r\\ntable.dataTable th.dt-center, td.dt-center { text-align: center !important; }\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/operator-summary/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/operator-summary/index.js":
/*!***********************************************!*\
  !*** ./src/layouts/operator-summary/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/operator-summary/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/form */ \"./src/scripts/form.js\");\n/* harmony import */ var _schema_senderId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../schema/senderId */ \"./src/schema/senderId.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../scripts/cookie */ \"./src/scripts/cookie.js\");\n\n\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\n// (\"Welcome to senderId management!\");\n\n// new Form(Schema).render(\"#add-senderId-form\");\n\n// $(() => {\nvar today = new Date();\nvar date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();\n\n$('.datepicker').val(date);\n\n$('#from').datetimepicker({\n  format: 'Y-m-d',\n  timepicker: false,\n  closeOnDateSelect: true\n}).attr('readonly', 'readonly');\n\n$('#to').datetimepicker({\n  format: 'Y-m-d',\n  timepicker: false,\n  closeOnDateSelect: true\n}).attr('readonly', 'readonly');\n\n$(\"#connect-summary-tab\").click(() => {\n  loadConnectSummary();\n});\n\n$(\"#senderId-traffic-tab\").click(() => {\n\n  const data1 = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    \"fromDate\": date,\n    \"toDate\": date\n  };\n\n  loadSenderIdTraffic(data1);\n});\n\n$(\"#controls-form\").submit(function (e) {\n  e.preventDefault();\n\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    fromDate: this[0].value,\n    toDate: this[1].value\n  };\n  loadSenderIdTraffic(data);\n});\n\n$(\"#todayTableHeader\").click(function () {\n  $(this).toggleClass(\"active\");\n  $(\".todayTableDisplay\").toggleClass(\"d-none\");\n});\n\n$(\"#yesterDayTableHeader\").click(function () {\n  $(this).toggleClass(\"active\");\n  $(\".yesterDayTableDisplay\").toggleClass(\"d-none\");\n});\n\n$(\"#currentMonthTableHeader\").click(function () {\n  $(this).toggleClass(\"active\");\n  $(\".currentMonthTableDisplay\").toggleClass(\"d-none\");\n});\n\n$(\"#lastMonthTableHeader\").click(function () {\n  $(this).toggleClass(\"active\");\n  $(\".lastMonthTableDisplay\").toggleClass(\"d-none\");\n});\n\nconst data = {\n  loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n  receiveDate: date\n};\n\nloadConnectSummary();\n\nfunction loadConnectSummary() {\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"connectSummary\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      if (data.message) {\n        $(\".alert\").alert('close');\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n          clearTime: 5 * 1000\n        });\n      }\n\n      const todayData = (data.data || {}).todayDataGrid || [];\n      const getHeading = key => {\n        let result = key.replace(/([A-Z])/g, \" $1\");\n        return result.charAt(0).toUpperCase() + result.slice(1);\n      };\n      const headerRow = todayData[0];\n      let tableHeader = [];\n      let formattedTableHeader = [];\n      for (let key in headerRow) {\n        if (headerRow.hasOwnProperty(key)) {\n          tableHeader.push(key);\n          formattedTableHeader.push(getHeading(key));\n        }\n      }\n\n      var todayTableData = todayData.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      const yesterdayData = (data.data || {}).previousDayDataGrid || [];\n      var yesterdayTableData = yesterdayData.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      const currentMonthData = (data.data || {}).currentMonthDataGrid || [];\n      var currentMonthTableData = currentMonthData.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      const lastMonthData = (data.data || {}).previousMonthDataGrid || [];\n      var lastMonthTableData = lastMonthData.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      $(\"#downloadTodayReport\").html(data.data.downloadTodayReport);\n      $(\"#downloadPreviousDayReport\").html(data.data.downloadPreviousDayReport);\n      $(\"#currentMonthTableDownload\").html(data.data.downloadCurrentMonthReport);\n      $(\"#downloadPreviousMonthReport\").html(data.data.downloadPreviousMonthReport);\n      if (data.data.downloadTodayReport) {\n        $(\"#downloadTodayReport\").addClass(\"btn btn-primary float-right\");\n        getDownloadableFiles(\"downloadTodayReport\");\n      }\n      if (data.data.downloadPreviousDayReport) {\n        $(\"#downloadPreviousDayReport\").addClass(\"btn btn-primary float-right\");\n        getDownloadableFiles(\"downloadPreviousDayReport\");\n      }\n      if (data.data.downloadCurrentMonthReport) {\n        $(\"#currentMonthTableDownload\").addClass(\"btn btn-primary float-right\");\n        getDownloadableFiles(\"currentMonthTableDownload\");\n      }\n      if (data.data.downloadPreviousMonthReport) {\n        $(\"#downloadPreviousMonthReport\").addClass(\"btn btn-primary float-right\");\n        getDownloadableFiles(\"downloadPreviousMonthReport\");\n      }\n\n      renderTable(\"todaysTable\", todayTableData);\n      renderTable(\"yesterDayTable\", yesterdayTableData);\n      renderTable(\"currentMonthTable\", currentMonthTableData);\n      renderTable(\"lastMonthTable\", lastMonthTableData);\n    }\n  });\n}\n\nfunction loadSenderIdTraffic(data1) {\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"connectSenderIdSummary\"), \"POST\", data1, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      $(\"#displayDownloadBtn\").html(data.data.downloadReportLink);\n      getDownloadableFile();\n      $(\"#displayDownloadBtn #summary_donwload\").addClass(\"btn btn-info\");\n      if (data.message) {\n        $(\".alert\").alert('close');\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n          clearTime: 5 * 1000\n        });\n      }\n\n      const todayData = (data.data || {}).senderIdDataGrid || [];\n      const getHeading = key => {\n        let result = key.replace(/([A-Z])/g, \" $1\");\n        return result.charAt(0).toUpperCase() + result.slice(1);\n      };\n      const headerRow = todayData[0];\n      let tableHeader = [];\n      let formattedTableHeader = [];\n      for (let key in headerRow) {\n        if (headerRow.hasOwnProperty(key)) {\n          tableHeader.push(key);\n          formattedTableHeader.push(getHeading(key));\n        }\n      }\n\n      var senderIdData = todayData.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      renderSenderIDTable(\"senderIdTable\", senderIdData);\n    }\n  });\n}\n\nfunction renderTable(id, tableData) {\n\n  if ($.fn.dataTable.isDataTable(\"#\" + id)) {\n    $(\"#\" + id).DataTable().destroy();\n  }\n  var totalRow = tableData[tableData.length - 1];\n  var index = tableData.indexOf(totalRow);\n  tableData.splice(index, 1);\n  var table = $(\"#\" + id).DataTable({\n    data: tableData,\n    \"columns\": [{ title: \"date\" }, { title: \"Connect Name\" }, { title: \"Total Submit\" }, { title: \"Delivered\" }, { title: \"Failed\" }, { title: \"Total DN\" }, { title: \"Delvery %\" }, { title: \"Total DN %\" }],\n    paging: false,\n    searching: false,\n    \"bPaginate\": false,\n    \"bLengthChange\": false,\n    \"bFilter\": true,\n    \"bInfo\": false,\n    \"bAutoWidth\": false,\n    \"footerCallback\": function (row, data, start, end, display) {\n      var api = this.api(),\n          data;\n      // https://datatables.net/examples/advanced_init/footer_callback.html\n      $(api.column(2).footer()).html(totalRow[2]);\n      $(api.column(3).footer()).html(totalRow[3]);\n      $(api.column(4).footer()).html(totalRow[4]);\n      $(api.column(5).footer()).html(totalRow[5]);\n      $(api.column(6).footer()).html(totalRow[6]);\n      $(api.column(7).footer()).html(totalRow[7]);\n    }\n  });\n}\n\nfunction renderSenderIDTable(id, tableData) {\n\n  if ($.fn.dataTable.isDataTable(\"#\" + id)) {\n    $(\"#\" + id).DataTable().destroy();\n  }\n  var totalRow = tableData[tableData.length - 1];\n  var index = tableData.indexOf(totalRow);\n  tableData.splice(index, 1);\n  var table = $(\"#\" + id).DataTable({\n    data: tableData,\n    \"columns\": [{ title: \"receiveDate\" }, { title: \"userName\" }, { title: \"connectName\" }, { title: \"senderId\" }, { title: \"totalSubmit\" }, { title: \"delivered\" }, { title: \"failed\" }],\n    'columnDefs': [{ \"className\": \"dt-center\", \"targets\": \"_all\" }],\n    paging: false,\n    searching: false,\n    \"bPaginate\": false,\n    \"bLengthChange\": false,\n    \"bFilter\": true,\n    \"bInfo\": false,\n    \"bAutoWidth\": false,\n    \"footerCallback\": function (row, data, start, end, display) {\n      var api = this.api(),\n          data;\n      // https://datatables.net/examples/advanced_init/footer_callback.html\n      $(api.column(4).footer()).html(totalRow[4]);\n      $(api.column(5).footer()).html(totalRow[5]);\n      $(api.column(6).footer()).html(totalRow[6]);\n    }\n  });\n}\nfunction getDownloadableFile() {\n  $('#displayDownloadBtn').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName() + \"-\" + dTime + \"-operatorSummary.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_8__[\"default\"].get(\"resellerJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    exit();\n  });\n}\nfunction getDownloadableFiles(id) {\n  $('#' + id).on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName() + \"-\" + dTime + \"-operatorSummary.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_8__[\"default\"].get(\"resellerJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    exit();\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/operator-summary/index.js?");

/***/ }),

/***/ "./src/layouts/operator-summary/styles.css":
/*!*************************************************!*\
  !*** ./src/layouts/operator-summary/styles.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/operator-summary/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/operator-summary/styles.css?");

/***/ })

/******/ });