/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Library.ts":
/*!************************!*\
  !*** ./src/Library.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Library\": () => (/* binding */ Library)\n/* harmony export */ });\nclass Library {\r\n    static dialog(content, options = {}) {\r\n        const dialog_options = Object.assign({\r\n            force_ok: false,\r\n            btn_ok_hidden: false,\r\n            autoClose: 0,\r\n            theme: \"\",\r\n            icon: '<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>',\r\n            closeFunc: (e) => { }\r\n        }, options);\r\n        let dom = $(\"<div></div>\").addClass(\"dialog-wrapper\");\r\n        const dialog_close = (e = {}) => {\r\n            dom.addClass(\"closing\");\r\n            dialog_options.closeFunc(e);\r\n            setTimeout(() => {\r\n                dom.remove();\r\n            }, 2000);\r\n        };\r\n        let tmp = $(\"<div></div>\").append($(\"<div></div>\").addClass(\"icon\").html(dialog_options.icon)).append($(\"<div></div>\").addClass(\"txt\").html(content)).addClass(\"dialog\").addClass(dialog_options.theme).on({ \"click\": (e) => { e.stopPropagation(); } });\r\n        if (!dialog_options.btn_ok_hidden) {\r\n            tmp.append($(\"<div></div>\").addClass(\"button\").html(\"OK\").on({\r\n                \"click\": dialog_close\r\n            }));\r\n        }\r\n        dom.append(tmp);\r\n        if (!dialog_options.force_ok) {\r\n            dom.on({\r\n                \"click\": dialog_close\r\n            });\r\n        }\r\n        if (dialog_options.autoClose > 0) {\r\n            setTimeout(dialog_close, dialog_options.autoClose);\r\n        }\r\n        $(\"body\").append(dom);\r\n        setTimeout(() => {\r\n            dom.addClass(\"show\");\r\n        }, 10);\r\n        return {\r\n            close: dialog_close,\r\n            dom: dom\r\n        };\r\n    }\r\n    static floor(base, ext) {\r\n        return Math.floor(base * (10 ^ ext)) / (10 ^ ext);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://VRChat-AccessCounter/./src/Library.ts?");

/***/ }),

/***/ "./src/web/index.ts":
/*!**************************!*\
  !*** ./src/web/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library */ \"./src/Library.ts\");\n\r\n$(function () {\r\n    let ws = null, users = {}, pushedUser = [], id = \"\";\r\n    const deviceType = () => {\r\n        const ua = navigator.userAgent;\r\n        if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {\r\n            // スマートフォン\r\n            return \"mobile\";\r\n        }\r\n        else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {\r\n            // タブレット\r\n            return \"tablet\";\r\n        }\r\n        else {\r\n            // PC\r\n            return \"pc\";\r\n        }\r\n    };\r\n    const update = () => {\r\n        $(\".users, .pushedUser\").html(\"\");\r\n        Object.keys(users).forEach(Cid => {\r\n            let name = users[Cid];\r\n            if (id == Cid) {\r\n                $(\".users\").append(`<div class=\"user\">${name} [YOU]</div>`);\r\n            }\r\n            else {\r\n                $(\".users\").append(`<div class=\"user\">${name}</div>`);\r\n            }\r\n        });\r\n        let rank = 1;\r\n        pushedUser.forEach(Cid => {\r\n            if (Object.keys(users).indexOf(Cid) == -1) {\r\n                return;\r\n            }\r\n            let name = users[Cid];\r\n            if (id == Cid) {\r\n                $(\".pushedUser\").append(`<div class=\"user rank${rank}\"><div class=\"rank\">${rank}</div><div class=\"name\">${name}</div>[YOU]</div>`);\r\n            }\r\n            else {\r\n                $(\".pushedUser\").append(`<div class=\"user rank${rank}\"><div class=\"rank\">${rank}</div><div class=\"name\">${name}</div></div>`);\r\n            }\r\n            rank++;\r\n        });\r\n    };\r\n    const push = () => {\r\n        if ($(\"input#username\").val() == \"\") {\r\n            _Library__WEBPACK_IMPORTED_MODULE_0__.Library.dialog(`お名前を教えて下さい`);\r\n            return;\r\n        }\r\n        let dia = _Library__WEBPACK_IMPORTED_MODULE_0__.Library.dialog(`<n class=\"connecting-group\">通信中<div class=\"loading-period-group\"><span class=\"loading-period\">.</span><span class=\"loading-period\">.</span><span class=\"loading-period\">.</span></div></div>`, {\r\n            btn_ok_hidden: true,\r\n            force_ok: true,\r\n            icon: \"\"\r\n        });\r\n        setTimeout(() => {\r\n            let domain = \"\";\r\n            fetch(\"./api/v1/getWebSocketURL\").then(res => res.json()).then((data) => {\r\n                // console.log(data);\r\n                domain = data.url;\r\n                // console.log(domain);\r\n                let url = \"ws://\" + domain;\r\n                if (location.protocol == 'https:') {\r\n                    url = \"wss://\" + domain;\r\n                }\r\n                // console.log(location.protocol, location.protocol == 'https:');\r\n                ws = new WebSocket(url);\r\n                ws.addEventListener(\"message\", e => {\r\n                    const data = JSON.parse(e.data);\r\n                    // console.log(data);\r\n                    if (data.users != null) {\r\n                        users = data.users;\r\n                    }\r\n                    if (data.pushedUser != null) {\r\n                        pushedUser = data.pushedUser;\r\n                    }\r\n                    if (data.your_id != null) {\r\n                        id = data.your_id;\r\n                    }\r\n                    if (data.mode == \"reset\") {\r\n                        _Library__WEBPACK_IMPORTED_MODULE_0__.Library.dialog(\"リセットしました\", {\r\n                            autoClose: 500,\r\n                            btn_ok_hidden: true,\r\n                            force_ok: true,\r\n                            icon: \"\"\r\n                        });\r\n                    }\r\n                    update();\r\n                });\r\n                ws.addEventListener(\"open\", e => {\r\n                    ws.send(JSON.stringify({\r\n                        mode: \"hello\",\r\n                        name: $(\"input#username\").val()\r\n                    }));\r\n                    dia.close();\r\n                    $(\".top-wrapper\").hide();\r\n                    $(\".button-wrapper\").show();\r\n                });\r\n                ws.addEventListener(\"close\", e => {\r\n                    _Library__WEBPACK_IMPORTED_MODULE_0__.Library.dialog(\"通信が切断されました。\");\r\n                });\r\n            }).catch((e) => {\r\n                console.log(e);\r\n                dia.close();\r\n                _Library__WEBPACK_IMPORTED_MODULE_0__.Library.dialog(\"通信に失敗しました。\");\r\n            });\r\n        }, 250);\r\n    };\r\n    if (deviceType() == \"mobile\" || deviceType() == \"tablet\") {\r\n        $(\".btn.join\").on({\r\n            \"touchstart\": push\r\n        });\r\n    }\r\n    else {\r\n        $(\".btn.join\").on({\r\n            \"click\": push\r\n        });\r\n    }\r\n    $(\".main-button\").on({\r\n        \"click\": () => {\r\n            ws.send(JSON.stringify({\r\n                mode: \"push\"\r\n            }));\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://VRChat-AccessCounter/./src/web/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/web/index.ts");
/******/ 	
/******/ })()
;