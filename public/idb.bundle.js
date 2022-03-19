/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("//create variable to hold db connection\r\nlet db;\r\n\r\n//establish a connection to IndexedDB database called 'budget-tracker' and set it to version 1\r\nconst request = indexedDB.open(\"budget-tracker\", 2);\r\n\r\n// this event will emit if the database version changes (nonexistant to version 1, v1 to v2)\r\nrequest.onupgradeneeded = function (event) {\r\n  // save a reference to the database\r\n  const db = event.target.result;\r\n  // create an object store (table) called 'transaction', set it to have an auto incrementing primary key of sorts\r\n  db.createObjectStore(\"transactions\", { autoIncrement: true });\r\n};\r\n\r\n// successful connection\r\nrequest.onsuccess = function (event) {\r\n  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable\r\n  db = event.target.result;\r\n\r\n  // check if app is online, if yes run uploadPizza() function to send all local db data to api\r\n  if (navigator.onLine) {\r\n    uploadTransactions();\r\n  }\r\n};\r\n\r\nrequest.onerror = function (event) {\r\n  //log error\r\n  console.log(event.target.errorCode);\r\n};\r\n\r\nfunction saveRecord(record) {\r\n  //open a new transaction with database with read and write permissions\r\n  const transaction = db.transaction([\"transactions\"], \"readwrite\");\r\n\r\n  //access the object store for 'transactions'\r\n  const transactionObjectStore = transaction.objectStore(\"transactions\");\r\n\r\n  //add record to store using add method\r\n  transactionObjectStore.add(record);\r\n  console.log(\"Transaction saved locally:\", record);\r\n  alert(\"Application is offline. Storing data locally.\");\r\n}\r\n\r\nfunction uploadTransactions() {\r\n  console.log(\"uploading all locally saved transactions!\");\r\n  //open a transaction on your db\r\n  const transaction = db.transaction([\"transactions\"], \"readwrite\");\r\n\r\n  //access the object store\r\n  const transactionObjectStore = transaction.objectStore(\"transactions\");\r\n\r\n  //get all records from store and set to a variable\r\n  const getAll = transactionObjectStore.getAll();\r\n\r\n  //upon a seccessful .getAll() execution\r\n  getAll.onsuccess = function () {\r\n    //if there was data in db\r\n    if (getAll.result.length > 0) {\r\n      fetch(\"/api/transaction\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify(getAll.result),\r\n        headers: {\r\n          Accept: \"application/json, text/plain, */*\",\r\n          \"Content-Type\": \"application/json\",\r\n        },\r\n      })\r\n        .then((response) => {\r\n          return response.json();\r\n        })\r\n        .then((serverResonse) => {\r\n          if (serverResonse.message) {\r\n            throw new Error(serverResponse);\r\n          }\r\n          // open one more transaction\r\n          const transaction = db.transaction([\"transactions\"], \"readwrite\");\r\n\r\n          //access the object store\r\n          const transactionObjectStore =\r\n            transaction.objectStore(\"transactions\");\r\n\r\n          //get all records from store and set to a variable\r\n          const getAll = transactionObjectStore.clear();\r\n\r\n          alert(\"All saved transactions has been submitted\");\r\n        })\r\n        .catch((err) => {\r\n          console.log(err);\r\n        });\r\n    }\r\n  };\r\n}\r\n\r\nwindow.addEventListener(\"online\", uploadTransactions);\r\n\n\n//# sourceURL=webpack://budget-app/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;