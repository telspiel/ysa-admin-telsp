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
/******/ 		"connectMgmt": 0
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
/******/ 	deferredModules.push(["./src/layouts/connect-management/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/connect-management/styles.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/connect-management/styles.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".tree {\\n  margin:0;\\n  padding:0;\\n  list-style:none;\\n  width:fit-content;\\n}\\n\\n.tree li {\\n  margin:0;\\n  padding:0 1em;\\n  line-height:3em;\\n  color:#336699;\\n  font-weight:700;\\n  position:relative\\n}\\n\\n.indicator {\\n  margin-right:5px;\\n}\\n.tree li a {\\n  text-decoration: none;\\n  color:#336699;\\n  font-size: large;\\n}\\n.tree ul li a{\\n  font-size: medium;\\n  color: #369;\\n}\\n\\n.tree li table{\\n  margin-left: 1em;\\n  position: relative;\\n}\\n\\n.tree li table:before {\\n  content: \\\"\\\";\\n  display: block;\\n  width: 0;\\n  position: absolute;\\n  top: 0;\\n  bottom: 20px;\\n  left: 0;\\n  border-left: 1px solid;\\n}\\n\\n.tree li table tr:before {\\n  content: \\\"\\\";\\n  display: block;\\n  width: 25px;\\n  height: 0;\\n  border-top: 1px solid;\\n  margin-top: 23px;\\n  top: 1.5em;\\n  left: 0;\\n}\\n\\n.keranlName{\\n  padding-left: 8px;\\n}\\n\\n.keranlIcon{\\n  width: 50px;\\n  text-align: center;\\n}\\n\\n.select2-container{\\n  width: 100% !important;\\n  }\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/connect-management/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/connect-management/index.js":
/*!*************************************************!*\
  !*** ./src/layouts/connect-management/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/connect-management/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\n// console.log(\"Add Logo\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(document).ready(function () {\n  $('.select2').select2();\n});\n\nvar globalKernalList = null;\nloadConnects();\n\n$(\"#viewConnects\").click(() => {\n  loadConnects();\n});\n\n$(\"#editConnects\").click(() => {\n  getConnects();\n  $('#kernalPart').addClass('d-none');\n  $('.updateKennals .kennalRow').not(':first').remove();\n});\n\n$(\"#updateKernal\").submit(e => {\n  e.preventDefault();\n  var form = $(\"#updateKernal\").serializeArray();\n  var data = getFormData(form);\n  var sum = 0;\n\n  Object.keys(data).forEach(function (key) {\n    // console.log(key + ': ' + data[key]);\n    sum += parseInt(data[key]);\n  });\n\n  if (sum != 100) {\n    $(\".alert\").alert('close');\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Total of distribution should be equal to 100\", {\n      clearTime: 5 * 100\n    });\n    return;\n  }\n\n  const additionalData = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    groupId: $(\"#groupSelect\").val(),\n    kannelList: data\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"updatedKennalGroupMap\"), \"POST\", additionalData, {\n    showMainLoader: true\n  }).done(data => {\n    if (data.message) {\n      $(\".alert\").alert('close');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 5 * 1000\n      });\n\n      $(\"#updateKernal\")[0].reset();\n      loadConnects();\n    }\n  });\n});\nfunction loadConnects() {\n\n  const getUserData = {\n    \"loggedInUsername\": _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"viewRoutingGroups\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    // if (Endpoints.validateResponse(data)) {\n    // console.log(data);\n    var kernalList = data.data.groupKannelLoadMap;\n    globalKernalList = kernalList;\n    var html = \"\";\n    // console.log(kernalList);\n    // console.log(kernalList.Airtel_trans);\n    // console.log(Object.keys(kernalList));\n    for (let kernal of Object.keys(kernalList)) {\n      var kernalItem = kernalList[kernal];\n      html += \"<li><a href='#'>\" + kernal + \"</a><table>\";\n      for (let k of Object.keys(kernalItem)) {\n        html += \"<tr><td><span class='keranlName'>\" + k + \"</span> </td><td class='keranlIcon'><i class='fa fa-long-arrow-right' aria-hidden='true'></i> </td><td> <span class='kernalPercentage'>\" + kernalItem[k] + \"%</span></td></tr>\";\n      }\n      html += \"</table></li>\";\n    }\n    $('#tree2').html(html);\n    $('#tree2').treed();\n    // }\n  });\n}\n\nvar groupSelect = document.querySelector(\"#groupSelect\");\nvar kernalSelect = document.querySelector(\".kernalSelect\");\n\nvar kernalList;\n\nfunction getConnects() {\n\n  const getUserData = {\n    \"loggedInUsername\": _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserRoutingGroups\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      var aList = data.data.userGroupAndGroupIdMap;\n      groupSelect.options.length = 1;\n      $.each(aList, function (key, value) {\n        groupSelect.options[groupSelect.options.length] = new Option(key, value);\n      });\n    }\n  });\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getUserKennalList\"), \"POST\", getUserData, {\n    showMainLoader: true\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      kernalList = data.data.userKannelMap;\n      fillKernalDropdown(null, null);\n    }\n  });\n}\n\n$(\"#updateKernal\").on('reset', function () {\n  $('#kernalPart').addClass('d-none');\n  $('.updateKennals .kennalRow').not(':first').remove();\n});\n\n$(\"#groupSelect\").on('change', function () {\n  if (this.value) {\n    $(\"#kernalPart\").removeClass(\"d-none\");\n\n    $('.updateKennals .kennalRow').not(':first').remove(); // remove existing rows\n\n    // $('#kernalSelect option:selected', this).remove();\n    $('#kernalSelect option:selected', this).removeAttr('selected');\n\n    let temp = $(\"#groupSelect option:selected\").text();\n    var kernalItem = globalKernalList[temp];\n    if (Object.keys(kernalItem).length == 1) {\n      console.log(\"3\");\n\n      for (let kernal of Object.keys(kernalItem)) {\n        fillKernalDropdown(kernal, kernalItem[kernal]);\n        //   $(\"#kernalSelect option\").filter(function () {\n        //     return this.text == kernal;\n        //   }).attr('selected', true);\n        //   console.log(kernal,kernalItem[kernal]);\n        //   $('.kennalRow .kernalPercentage').val(kernalItem[kernal]);\n      }\n    } else {\n      for (let kernal of Object.keys(kernalItem)) {\n        if (Object.keys(kernalItem).indexOf(kernal) != 0) {\n          console.log(\"2\");\n          appendingRows(kernal, kernalItem[kernal]);\n        } else {\n          console.log(\"1\");\n          fillKernalDropdown(kernal, kernalItem[kernal]);\n          // $(\"#kernalSelect option\").filter(function () {\n          //   return this.text == kernal;\n          // }).attr('selected', true);\n          // console.log(kernal,kernalItem[kernal]);\n          // $('.kennalRow .kernalPercentage').val(kernalItem[kernal]);\n        }\n      }\n    }\n  } else {\n    $(\"#kernalPart\").addClass(\"d-none\");\n  }\n});\n\n$(\"#addMoreRows\").click(function () {\n  appendingRows(null, null);\n});\n\nfunction appendingRows(option, value) {\n  $('.updateKennals').append(`<div class=\"kennalRow row\">\n  <div class=\"col-md-3\"><select type=\"text\" class=\"form-control select2 dropdown kernalSelect\" name=\"kernalSelect\" required><option value=\"\">-- Select --</option></select></div>\n  <div class=\"col-md-2\"><input type=\"number\" class=\"form-control kernalPercentage\" name=\"kernalPercentage\" value=\"\" title=\"Percentage\" placeholder=\"\" required=\"\" min=\"1\" max=\"100\"></div>\n  <span>%</span>\n  <div class=\"col-md-2\"><button type=\"button\" id=\"removeMoreRows\" class=\"btn btn-danger removeMoreRows\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i>&ensp;Remove</button></div>\n  <br/><br/><br/>\n</div>`);\n  fillKernalDropdown(option, value);\n\n  // select2 dropdown for append rows\n\n  $('.kernalSelect').select2({\n    placeholder: \"--Select--\",\n    allowClear: true\n  });\n\n  $('.removeMoreRows').click(function (e) {\n    e.stopImmediatePropagation();\n    if (confirm('Are you sure? Do you want to remove this?')) {\n      $(this).closest('.kennalRow').remove();\n    } else {\n      return false;\n    }\n  });\n}\n\nfunction fillKernalDropdown(option, value) {\n  // console.log(option)\n  var kernalSelectAll = document.querySelectorAll(\"select.kernalSelect\");\n  var last = kernalSelectAll[kernalSelectAll.length - 1];\n  last.options.length = 1;\n  $.each(kernalList, function (key, value) {\n    last.options[last.options.length] = new Option(key, value);\n  });\n\n  $(\".updateKennals .kennalRow:last-child select.kernalSelect option\").filter(function () {\n    return this.text == option;\n  }).attr('selected', true);\n  $('.updateKennals .kennalRow:last-child input.kernalPercentage').val(value);\n}\n$.fn.extend({\n  treed: function (o) {\n\n    var openedClass = 'fa fa-minus-circle';\n    var closedClass = 'fa fa-plus-circle';\n\n    if (typeof o != 'undefined') {\n      if (typeof o.openedClass != 'undefined') {\n        openedClass = o.openedClass;\n      }\n      if (typeof o.closedClass != 'undefined') {\n        closedClass = o.closedClass;\n      }\n    };\n\n    //initialize each of the top levels\n    var tree = $(this);\n    tree.addClass(\"tree\");\n    tree.find('li').has(\"table\").each(function () {\n      var branch = $(this); //li with children ul\n      branch.prepend(\"<i class='indicator glyphicon \" + closedClass + \"'></i>\");\n      branch.addClass('branch');\n      branch.on('click', function (e) {\n        if (this == e.target) {\n          var icon = $(this).children('i:first');\n          icon.toggleClass(openedClass + \" \" + closedClass);\n          $(this).children().children().toggle();\n        }\n      });\n      branch.children().children().toggle();\n    });\n    //fire event from the dynamically added icon\n    tree.find('.branch .indicator').each(function () {\n      $(this).on('click', function () {\n        $(this).closest('li').click();\n      });\n    });\n    //fire event to open branch if the li contains an anchor instead of text\n    tree.find('.branch>a').each(function () {\n      $(this).on('click', function (e) {\n        $(this).closest('li').click();\n        e.preventDefault();\n      });\n    });\n    //fire event to open branch if the li contains a button instead of text\n    tree.find('.branch>button').each(function () {\n      $(this).on('click', function (e) {\n        $(this).closest('li').click();\n        e.preventDefault();\n      });\n    });\n  }\n});\n\n$('#tree1').treed();\n\nfunction getFormData(unindexed_array) {\n  // var unindexed_array = $form.serializeArray();\n  // console.log(\"length : \" + unindexed_array.length);\n  var indexed_array = {};\n  let j = 0;\n  for (let i = 0; i < unindexed_array.length / 2; i++) {\n    var k = j + i;\n    indexed_array[unindexed_array[k]['value']] = unindexed_array[k + 1]['value'];\n    j = i + 1;\n  }\n  return indexed_array;\n}\n\n//# sourceURL=webpack:///./src/layouts/connect-management/index.js?");

/***/ }),

/***/ "./src/layouts/connect-management/styles.css":
/*!***************************************************!*\
  !*** ./src/layouts/connect-management/styles.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/connect-management/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/connect-management/styles.css?");

/***/ })

/******/ });