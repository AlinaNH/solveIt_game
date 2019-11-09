/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";
	
	var observerGameResult = new MutationObserver(function (mutations) {
	  if (document.contains($(".gameResult")[0])) {
	    var gameResult = void 0,
	        minutes = void 0,
	        seconds = void 0,
	        message = void 0;
	
	    if (!localStorage.previousGameScore) {
	      gameResult = localStorage.lastGameScore;
	    } else {
	      gameResult = Math.abs(localStorage.previousGameScore - localStorage.lastGameScore);
	    }
	    minutes = Math.floor(gameResult / 60);
	    seconds = gameResult - Math.floor(gameResult / 60) * 10;
	
	    var resultMessage = {
	      firstTimeWithMinutes: "Congratulations! Your score is " + minutes + " minutes " + seconds + " seconds!",
	      firstTimeWithoutMinutes: "Congratulations! Your score is " + seconds + " seconds!",
	      withMinutesFaster: "Congratulation! You have counted " + minutes + " minutes " + seconds + " seconds faster than in the previous game.",
	      withoutMinutesFaster: "Congratulation! You have counted " + seconds + " seconds faster than in the previous game.",
	      withMinutesSlower: "You have counted " + minutes + " minutes " + seconds + " seconds slower than in the previous game. Try again!",
	      withoutMinutesSlower: "You have counted " + seconds + " seconds slower than in the previous game. Try again!"
	    };
	
	    if (!localStorage.previousGameScore && !minutes) {
	      message = resultMessage.firstTimeWithoutMinutes;
	    } else if (!localStorage.previousGameScore && minutes) {
	      message = resultMessage.firstTimeWithMinutes;
	    } else if (localStorage.previousGameScore && !minutes && localStorage.previousGameScore >= localStorage.lastGameScore) {
	      message = resultMessage.withoutMinutesFaster;
	    } else if (localStorage.previousGameScore && !minutes && localStorage.previousGameScore < localStorage.lastGameScore) {
	      message = resultMessage.withoutMinutesSlower;
	    } else if (localStorage.previousGameScore && minutes && localStorage.previousGameScore >= localStorage.lastGameScore) {
	      message = resultMessage.withMinutesFaster;
	    } else if (localStorage.previousGameScore && minutes && localStorage.previousGameScore < localStorage.lastGameScore) {
	      message = resultMessage.withMinutesSlower;
	    }
	
	    $(".gameResult").html(message);
	    observerGameResult.disconnect();
	  }
	});
	
	observerGameResult.observe(document, {
	  attributes: false,
	  childList: true,
	  characterData: false,
	  subtree: true
	});

/***/ })
/******/ ]);
//# sourceMappingURL=score.bundle.js.map