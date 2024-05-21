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
/******/ 		"senderId-management": 0
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
/******/ 	deferredModules.push(["./src/layouts/senderId-management/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/senderId-management/styles.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/senderId-management/styles.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".autocomplete{\\r\\n    width: auto;\\r\\n    border: 1px solid #ced4da;\\r\\n    border-radius: 5px;\\r\\n    height: 33px;\\r\\n}\\r\\n\\r\\n.autocomplete .dropdown{\\r\\n    border-top: none;\\r\\n    border-bottom: none;\\r\\n    border-left: none;\\r\\n}\\r\\n\\r\\n#pendingApprovalTable_filter,#senderIDTable_filter{\\r\\n    display: none;\\r\\n}\\r\\ninput::-webkit-outer-spin-button,\\r\\ninput::-webkit-inner-spin-button {\\r\\n  -webkit-appearance: none;\\r\\n  margin: 0;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/senderId-management/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/senderId-management/index.js":
/*!**************************************************!*\
  !*** ./src/layouts/senderId-management/index.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/senderId-management/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/form */ \"./src/scripts/form.js\");\n/* harmony import */ var _schema_senderId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../schema/senderId */ \"./src/schema/senderId.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\n// (\"Welcome to senderId management!\");\n\n// new Form(Schema).render(\"#add-senderId-form\");\n\n$(\"#cancelForm\").click(() => {\n  $(\"#add-senderId\")[0].reset();\n});\n\n$(document).ready(function () {\n  $('.select2').select2();\n});\n$(\"#add-senderId\").submit(function (e) {\n  e.preventDefault();\n  var senderId = $(\"#senderId\").val();\n  console.log(senderId);\n  var senderIdType = $(\"input[name=senderIdType]:checked\").val();\n  var rege = /^(?=.*[a-zA-Z0-9])(?!^\\d+$)[a-ziA-Z0-9]{6,6}$/;\n  var numRegx = /^[0-9]{6,6}$/;\n  console.log(senderIdType);\n  if (senderIdType == \"others\") {\n    if (rege.test(senderId) || numRegx.test(this[0].value)) {} else {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(\"Sender ID must contain 6 alpha numeric characters, special characters are not allowed\", {\n        clearTime: 10 * 10 * 1000\n      });\n      return;\n    }\n  } else {\n    if ($.isNumeric(senderId)) {} else {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(\"Sender ID must contain 6  numeric characters, special characters are not allowed\", {\n        clearTime: 10 * 10 * 1000\n      });\n      return;\n    }\n  }\n  const formData = {};\n\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n  // var userItem = userList.find(x => x.userName == $(\"#add .dropdown.userName\").val());\n  // formData['userId'] = userItem.userId;\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    operation: \"addSenderId\",\n    entityId: $(\"#addentityid\").val(),\n    headerId: $(\"#headerid\").val()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"saveSenderId\"), \"POST\", $.extend({}, formData, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      // (data);\n      $(\".alert\").alert('close');\n      $(\"#add-senderId\")[0].reset();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n    }\n  });\n});\n\nvar userList;\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName()\n};\n\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getAllUserList\"), \"POST\", data).done(data => {\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n    }\n    const allChildMap = data.data.userList;\n    const rList = allChildMap;\n    userList = allChildMap;\n    // var rData = [];\n    var selectField = document.getElementById(\"userName\");\n    $.each(rList, function (key, value) {\n      selectField.options[selectField.options.length] = new Option(value.userName, value.userId);\n    });\n    /*\n        $.each(rList, function (key, value) {\n          rData.push({ \"id\": value.userId, \"name\": value.userName, \"ignore\": false });\n        });\n    \n        // (rData);\n        $('.userName').autocomplete({\n          nameProperty: 'name',\n          valueField: '#hidden-field',\n          dataSource: rData\n        });\n    */\n  }\n});\n\n$(\"#approve-senderId-tab\").click(() => {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    isApprovedSenderIdList: \"Y\"\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getAllSenderIdsForUser\"), \"POST\", data).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      if (data.message) {\n        $(\".alert\").alert('close');\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n          clearTime: 5 * 1000\n        });\n      }\n\n      const grid = (data.data || {}).senderIdList || [];\n      const getHeading = key => {\n        let result = key.replace(/([A-Z])/g, \" $1\");\n        return result.charAt(0).toUpperCase() + result.slice(1);\n      };\n      const headerRow = grid[0];\n      let tableHeader = [];\n      let formattedTableHeader = [];\n      for (let key in headerRow) {\n        if (headerRow.hasOwnProperty(key)) {\n          tableHeader.push(key);\n          formattedTableHeader.push(getHeading(key));\n        }\n      }\n\n      const tableData = grid.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      if ($.fn.dataTable.isDataTable('#senderIDTable')) {\n        $('#senderIDTable').DataTable().destroy();\n      }\n      var table = $('#senderIDTable').DataTable({\n        data: tableData,\n        // colReorder: {\n        //     order: [ 0,5,6,1,2,3,7,8,9]\n        // },\n        \"columns\": [{ title: \"senderId\" }, { title: \"status\" }, { title: \"is Default\" }, { title: \"is NonDndNumberAllowed\" }, { title: \"userName\" }, { title: \"idOfSenderId\" }, { title: \"Entity Id\" }, { title: \"Header Id\" }, { title: \"Sender Id Type\" }, { title: \"action\" }],\n        \"columnDefs\": [{\n          \"targets\": [5],\n          \"visible\": false,\n          \"searchable\": false\n        }, {\n          \"targets\": -1,\n          \"data\": null,\n          \"defaultContent\": \"<button class='btn btn-info'> <i class='fa fa-pencil' aria-hidden='true'></i> Edit</button>\"\n        }],\n        paging: false\n      });\n\n      $('#senderIDTable tbody').on('click', 'button', function () {\n\n        var table = $('#senderIDTable').DataTable();\n        var data = table.row($(this).parents('tr')).data();\n        //  var data = table.row( this ).data();\n        $('#myModal').modal('show');\n        console.log(data);\n        // console.log( table.row( this ).data() );\n        // console.log(data);\n        $(\".editSenderId #senderId\").html(data[0]);\n        $(\".editSenderId #userName\").html(data[4]);\n        $(\"#idOfSenderId\").html(data[5]);\n        if (data[6] != \"-\") {\n          $(\".editSenderId #updateEntityid\").val(data[6]);\n        } else {\n          $(\".editSenderId #updateEntityid\").val(\"\");\n        }\n        if (data[7] != \"-\") {\n          $(\".editSenderId #updateHeaderid\").val(data[7]);\n        } else {\n          $(\".editSenderId #updateHeaderid\").val(\"\");\n        }\n        // $(\".editSenderId\");\n      });\n    }\n  });\n});\n\n$('#update').on('click', function () {\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    operation: \"updateSenderId\",\n    \"senderId\": $(\".editSenderId #senderId\").html(),\n    \"isDefault\": $(\"#isDefault\").val(),\n    \"isNonDndNumberAllowed\": $(\"#isNonDndNumberAllowed\").val(),\n    \"isActive\": $(\"#isActive\").val(),\n    \"idOfSenderId\": parseInt($(\"#idOfSenderId\").html()),\n    entityId: $(\"#updateEntityid\").val(),\n    headerId: $(\"#updateHeaderid\").val()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"saveSenderId\"), \"POST\", $.extend({}, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      $(\".alert\").alert('close');\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n      $(\"#approve-senderId-tab\").trigger(\"click\");\n    }\n  });\n});\n\n$(\"#pending-senderId-tab\").click(() => {\n  loadPendingSenderId();\n});\n\nfunction loadPendingSenderId() {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n    isApprovedSenderIdList: \"N\"\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"getAllSenderIdsForUser\"), \"POST\", data).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n      if (data.message) {\n        $(\".alert\").alert('close');\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message, {\n          clearTime: 5 * 1000\n        });\n      }\n\n      const grid = (data.data || {}).senderIdList || [];\n      const getHeading = key => {\n        let result = key.replace(/([A-Z])/g, \" $1\");\n        return result.charAt(0).toUpperCase() + result.slice(1);\n      };\n      const headerRow = grid[0];\n      let tableHeader = [];\n      let formattedTableHeader = [];\n      for (let key in headerRow) {\n        if (headerRow.hasOwnProperty(key)) {\n          tableHeader.push(key);\n          formattedTableHeader.push(getHeading(key));\n        }\n      }\n\n      const tableData = grid.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      if ($.fn.dataTable.isDataTable('#pendingApprovalTable')) {\n        $('#pendingApprovalTable').DataTable().destroy();\n      }\n      var table = $('#pendingApprovalTable').DataTable({\n        data: tableData,\n        \"columns\": [{ title: \"senderId\" }, { title: \"status\" }, { title: \"is Default\" }, { title: \"is NonDndNumberAllowed\" }, { title: \"userName\" }, { title: \"idOfSenderId\" }, { title: \"action\" }],\n        \"columnDefs\": [{\n          \"targets\": [5],\n          \"visible\": false,\n          \"searchable\": false\n        }, {\n          \"targets\": -1,\n          \"data\": null,\n          \"defaultContent\": \"<button class='btn btn-info'> <i class='fa fa-check' aria-hidden='true'></i> Approve</button>\"\n        }],\n        paging: false\n      });\n\n      $('#pendingApprovalTable tbody').on('click', 'button', function () {\n        var table = $('#pendingApprovalTable').DataTable();\n        var data = table.row($(this).parents('tr')).data();\n        $(\".alert\").alert('close');\n        const additionalData = {\n          loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getName(),\n          operation: \"updateSenderId\",\n          \"senderId\": data[0],\n          \"isDefault\": data[2],\n          \"entityId\": data[6],\n          \"headerId\": data[7],\n          \"isNonDndNumberAllowed\": data[3],\n          \"isActive\": \"Y\",\n          \"idOfSenderId\": data[5]\n        };\n\n        Object(_scripts_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"saveSenderId\"), \"POST\", additionalData).done(data => {\n          if (_config_endpoints__WEBPACK_IMPORTED_MODULE_6__[\"default\"].validateResponse(data)) {\n            loadPendingSenderId();\n            $(\".alert\").alert('close');\n            data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_7__[\"default\"].error(data.message));\n          }\n        });\n      });\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/senderId-management/index.js?");

/***/ }),

/***/ "./src/layouts/senderId-management/styles.css":
/*!****************************************************!*\
  !*** ./src/layouts/senderId-management/styles.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/senderId-management/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/senderId-management/styles.css?");

/***/ })

/******/ });