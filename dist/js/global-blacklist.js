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
/******/ 		"global-blacklist": 0
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
/******/ 	deferredModules.push(["./src/layouts/global-blacklist/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/global-blacklist/styles.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/global-blacklist/styles.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".add-organization-form h3 {\\r\\n    font-size: 22px;\\r\\n    text-align: center;\\r\\n}\\r\\n.add-blacklist {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    width: 30%;\\r\\n    margin-left: auto;\\r\\n    margin-right: auto;\\r\\n}\\r\\n\\r\\n.blacklist-btns-wrap {\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n    gap: 10px;\\r\\n    margin-top: 20px;\\r\\n}\\r\\n\\r\\n.btn-success {\\r\\n    padding: 0;\\r\\n    width: 10%;\\r\\n    cursor: pointer;\\r\\n}\\r\\n\\r\\n.btn-danger {\\r\\n    padding: 0;\\r\\n    width: 10%;\\r\\n    cursor: pointer;\\r\\n}\\r\\n\\r\\ninput[type=number]::-webkit-outer-spin-button,\\r\\ninput[type=number]::-webkit-inner-spin-button {\\r\\n    -webkit-appearance: none;\\r\\n    margin: 0;\\r\\n}\\r\\n\\r\\ninput[type=number] {\\r\\n    -moz-appearance: textfield;\\r\\n}\\r\\n\\r\\ninput:focus {\\r\\n    outline: none;\\r\\n    box-shadow: none;\\r\\n}\\r\\n\\r\\n/* ----------------------------------------------------- */\\r\\n.upload-organization-form h3 {\\r\\n    font-size: 22px;\\r\\n    text-align: center;\\r\\n}\\r\\n\\r\\n.upload-blacklist {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    width: 30%;\\r\\n    margin-left: auto;\\r\\n    margin-right: auto;\\r\\n}\\r\\n\\r\\n/* ------------------------------------------------------------------ */\\r\\n.view-blacklist-form h3 {\\r\\n    font-size: 22px;\\r\\n    text-align: center;\\r\\n}\\r\\n\\r\\n.view-blacklist-card {\\r\\n    padding: 20px;\\r\\n    max-width: 490px;\\r\\n    margin: 20px auto;\\r\\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\\r\\n    display: flex;\\r\\n    flex-direction: row;\\r\\n    align-items: center;\\r\\n    justify-content: center;\\r\\n    gap: 20px;\\r\\n}\\r\\n\\r\\n.search-view-btn {\\r\\n    margin-top: 10px;\\r\\n    height: 40px;\\r\\n    width: 100px;\\r\\n}\\r\\n\\r\\n.table {\\r\\n    width: 100%;\\r\\n    table-layout: fixed;\\r\\n    border-collapse: collapse;\\r\\n}\\r\\n.table th, .table td {\\r\\n    text-align: center;\\r\\n    vertical-align: middle;\\r\\n    border: 1px solid #ddd;\\r\\n    padding: 8px;\\r\\n}\\r\\n.table th:nth-child(2), .table td:nth-child(2) {\\r\\n    max-width: 40%;\\r\\n    word-break: break-word;\\r\\n    white-space: normal;\\r\\n}\\r\\n.table th {\\r\\n    background-color: #f2f2f2;\\r\\n}\\r\\n\\r\\n.delete-btn {\\r\\n    color: red;\\r\\n    border: none;\\r\\n    background: transparent;\\r\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/global-blacklist/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/global-blacklist/index.js":
/*!***********************************************!*\
  !*** ./src/layouts/global-blacklist/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/global-blacklist/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/form */ \"./src/scripts/form.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n\n\n\n\n\n\n\n\nconsole.log(\"Welcome to Global Blacklist!\");\nconsole.log(\"Welcome to Global Blacklist! Mr. Arnav\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].isLoggedIn()) {\n    window.location.href = \"/login\";\n}\n\nconst bearerToken = _scripts_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getJWTToken();\n\ndocument.getElementById('addButton').addEventListener('click', function () {\n    const mobileNumber = document.getElementById('mobileNumber').value;\n    const description = document.getElementById('description').value;\n\n    if (!mobileNumber || !description) {\n        alert('Please fill in both the mobile number and description.');\n        return;\n    }\n\n    const fullMobileNumber = '91' + mobileNumber;\n\n    const payload = {\n        phoneNumber: fullMobileNumber,\n        description: description\n    };\n\n    // Fetch the endpoint with authorization headers\n    fetch(_config_endpoints__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"addBlacklistNumber\"), {\n        method: 'POST',\n        headers: {\n            'Content-Type': 'application/json',\n            'Authorization': bearerToken\n        },\n        body: JSON.stringify(payload)\n    }).then(response => {\n        // Check if the response is not ok\n        if (!response.ok) {\n            throw new Error('Network response was not ok ' + response.statusText);\n        }\n        // Determine the response content type\n        const contentType = response.headers.get('content-type');\n        if (contentType && contentType.includes('application/json')) {\n            return response.json(); // If JSON, parse it as JSON\n        } else {\n            return response.text(); // Otherwise, parse it as text\n        }\n    }).then(data => {\n        let message = '';\n        if (typeof data === 'string') {\n            message = data;\n            console.log(message);\n        } else {\n            // Validate the response data if it's JSON\n            if (_config_endpoints__WEBPACK_IMPORTED_MODULE_5__[\"default\"].validateResponse(data)) {\n                message = 'Success';\n            } else {\n                message = 'Failed to add number to blacklist.';\n            }\n        }\n\n        const responseMessageElement = document.getElementById('responseMessage');\n        responseMessageElement.textContent = message;\n        responseMessageElement.style.display = 'block';\n\n        // setting the background color based on the response message\n        if (message === 'Number Added Successfully') {\n            responseMessageElement.style.color = \"#18705f\";\n            responseMessageElement.style.backgroundColor = '#d5f7f0';\n            responseMessageElement.style.borderColor = \"#c4f4eb\";\n        } else {\n            responseMessageElement.style.color = \"#852b3a\";\n            responseMessageElement.style.backgroundColor = '#ffdde2';\n            responseMessageElement.style.borderColor = \"#ffcfd7\";\n        }\n\n        // Hide the response message after 3 seconds\n        setTimeout(() => {\n            responseMessageElement.style.display = 'none';\n        }, 3000);\n\n        window.scrollTo({ top: 0, behavior: \"smooth\" });\n\n        //clearing input fields if API hit successfully\n        document.getElementById('mobileNumber').value = '';\n        document.getElementById('description').value = '';\n    }).catch(error => {\n        console.error('Error calling the API:', error);\n    });\n});\n\n//clearing input fields when cancel button clicked\ndocument.getElementById('cancelForm').addEventListener('click', function () {\n    document.getElementById('mobileNumber').value = '';\n    document.getElementById('description').value = '';\n});\n\n// Api to call single serach mobile number\ndocument.getElementById('searchButton').addEventListener('click', function () {\n    const mobileNumber = document.getElementById('blacklistMobileNumber').value;\n\n    if (!mobileNumber) {\n        alert('Please enter a mobile number to search.');\n        return;\n    }\n\n    const fullMobileNumber = '91' + mobileNumber;\n\n    // Construct the URL with the query parameter\n    const url = new URL(_config_endpoints__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"searchMobileNumber\"));\n    url.searchParams.append('mobileNumber', fullMobileNumber);\n\n    // Fetch the endpoint with authorization headers\n    fetch(url, {\n        method: 'GET',\n        headers: {\n            'Authorization': bearerToken\n        }\n    }).then(response => {\n        // Check if the response is not ok\n        if (!response.ok) {\n            throw new Error('Network response was not ok ' + response.statusText);\n        }\n        return response.text(); // Assuming the response is text\n    }).then(data => {\n        console.log('Search Result:', data);\n\n        //reseting the input fields\n        document.getElementById('blacklistMobileNumber').value = '';\n\n        // Clear existing table rows\n        const tableBody = document.getElementById('blacklistTable').querySelector('tbody');\n        tableBody.innerHTML = '';\n\n        // Parse the data string into JSON\n        const jsonData = JSON.parse(data);\n\n        // Create a new row and append it to the table body\n        const row = document.createElement('tr');\n        row.innerHTML = `\n                <td>${jsonData.phoneNumber}</td>\n                <td>${jsonData.description}</td>\n                <td><button class=\"delete-btn\" data-id=\"${jsonData.phoneNumber}\"> <i class=\"fas fa-trash-alt\"></i></button></td>\n            `;\n        tableBody.appendChild(row);\n\n        // Add event listener to the delete button\n        row.querySelector('.delete-btn').addEventListener('click', function () {\n            const phoneNumber = this.getAttribute('data-id');\n            deleteBlacklistNumber(phoneNumber, row);\n        });\n    }).catch(error => {\n        console.error('Error calling the API:', error);\n    });\n});\n\n//API to delete phone number\nfunction deleteBlacklistNumber(phoneNumber, row) {\n    // Construct the URL with the query parameter\n    const url = new URL(_config_endpoints__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"deleteBlacklistNumber\"));\n    url.searchParams.append('mobileNumber', phoneNumber);\n\n    // Fetch the endpoint with authorization headers\n    fetch(url, {\n        method: 'POST',\n        headers: {\n            'Authorization': bearerToken\n        }\n    }).then(response => {\n        // Check if the response is not ok\n        if (!response.ok) {\n            throw new Error('Network response was not ok ' + response.statusText);\n        }\n        return response.text(); // Assuming the response is text\n    }).then(message => {\n\n        const responseMessageElement = document.getElementById('deleteResponseMessage');\n        responseMessageElement.textContent = message;\n        responseMessageElement.style.display = 'block';\n\n        if (message === 'Number Deleted Successfully') {\n            responseMessageElement.style.color = \"#18705f\";\n            responseMessageElement.style.backgroundColor = '#d5f7f0';\n            responseMessageElement.style.borderColor = \"#c4f4eb\";\n        } else {\n            responseMessageElement.style.color = \"#852b3a\";\n            responseMessageElement.style.backgroundColor = '#ffdde2';\n            responseMessageElement.style.borderColor = \"#ffcfd7\";\n        }\n\n        // Hide the response message after 3 seconds\n        setTimeout(() => {\n            responseMessageElement.style.display = 'none';\n        }, 3000);\n\n        window.scrollTo({ top: 0, behavior: \"smooth\" });\n\n        // Remove the row from the table when number gets deleted\n        row.remove();\n    }).catch(error => {\n        console.error('Error deleting number:', error);\n        // Show error message\n        showResponseMessage('Failed to delete number.', false);\n    });\n}\n\n//API to Upload Backlist Number in .txt file\ndocument.getElementById('uploadButton').addEventListener('click', function () {\n    const fileInput = document.getElementById('fileUpload');\n    const uploadDescription = document.getElementById('uploadDescription').value;\n\n    if (!fileInput.files.length) {\n        alert('Please select a file to upload.');\n        return;\n    }\n\n    if (!uploadDescription) {\n        alert('Please enter a description.');\n        return;\n    }\n\n    const file = fileInput.files[0];\n    const formData = new FormData();\n    formData.append('file', file);\n    // formData.append('uploadDescription', uploadDescription);\n\n    // Construct the URL with the query parameter\n    const url = new URL(_config_endpoints__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"uploadBlacklistNumber\"));\n    url.searchParams.append('fileType', 'txt');\n    url.searchParams.append('uploadDescription', uploadDescription);\n\n    fetch(url, {\n        method: 'POST',\n        headers: {\n            'Authorization': bearerToken\n        },\n        body: formData\n    }).then(response => {\n        if (!response.ok) {\n            throw new Error('Network response was not ok ' + response.statusText);\n        }\n        return response.json(); // Parse response as JSON (getting response in JSON only)\n    }).then(data => {\n        console.log('Upload Result:', data);\n        const { totalCount, totalNumberSave } = data;\n\n        // Verify if the values are correctly extracted\n        console.log('Total Count:', totalCount);\n        console.log('Total Number Save:', totalNumberSave);\n\n        // Create the message string\n        const message = `Total Count: ${totalCount}, Total Number Save: ${totalNumberSave}`;\n\n        // Display the message\n        const responseMessageElement = document.getElementById('uploadResponseMessage');\n        responseMessageElement.textContent = message;\n        responseMessageElement.style.display = 'block';\n        responseMessageElement.style.color = \"#18705f\";\n        responseMessageElement.style.backgroundColor = '#d5f7f0';\n        responseMessageElement.style.borderColor = \"#c4f4eb\";\n\n        // Hide the response message after 3 seconds\n        setTimeout(() => {\n            responseMessageElement.style.display = 'none';\n        }, 3000);\n\n        window.scrollTo({ top: 0, behavior: \"smooth\" });\n\n        //reset input fields\n        document.getElementById('fileUpload').value = '';\n        document.getElementById('uploadDescription').value = '';\n    }).catch(error => {\n        console.error('Error uploading the file:', error);\n    });\n});\n\ndocument.getElementById('cancelUploadForm').addEventListener('click', function () {\n    document.getElementById('uploadDescription').value = '';\n});\n\n//# sourceURL=webpack:///./src/layouts/global-blacklist/index.js?");

/***/ }),

/***/ "./src/layouts/global-blacklist/styles.css":
/*!*************************************************!*\
  !*** ./src/layouts/global-blacklist/styles.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/global-blacklist/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/global-blacklist/styles.css?");

/***/ })

/******/ });