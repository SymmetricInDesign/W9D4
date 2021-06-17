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

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/***/ ((module) => {

eval("class DOMNodeCollection{\n    constructor(HTMLElementsArr){\n        this.HTMLElementsArr = HTMLElementsArr\n    }\n\n    html(string=-1){\n        if (string == -1) return this.HTMLElementsArr[0].innerHTML\n        this.HTMLElementsArr.forEach(el=>el.innerHTML = string)\n        return this\n    }\n\n    empty(){\n        this.html(\"\")\n        return this\n    }\n\n    append(arg){\n        if (arg instanceof DOMNodeCollection){\n            arg.HTMLElementsArr.forEach(innerEl=>{\n                this.HTMLElementsArr.forEach(outerEl=>{\n                    outerEl.html(innerEl.outerHTML)\n                })\n            })\n        }else if (typeof arg == \"string\"){\n            this.HTMLElementsArr.forEach(outerEl=>{\n                outerEl.html(arg)\n            })\n        }else if (arg instanceof HTMLElement){\n            this.HTMLElementsArr.forEach(outerEl=>{\n                outerEl.html(arg.outerHTML)\n            })\n        }\n        return this\n    }\n\n    attr(attribute, value=-1){\n        if (value != -1){\n            this.HTMLElementsArr.forEach(el=>{\n                el.setAttribute(attribute, value)\n            })\n            return this\n        }else{\n            return this.HTMLElementsArr[0].getAttribute(attribute)\n        }  \n    }\n\n    addClass(className){\n        this.HTMLElementsArr.forEach(el=>{\n            el.classList.add(className)\n        })\n        return this\n    }\n\n    removeClass(className){\n        this.HTMLElementsArr.forEach(el=>{\n            el.classList.remove(className)\n        })\n        return this\n    }\n\n    children(){\n        let children = []\n        this.HTMLElementsArr.forEach(el=>{\n            children = children.concat(Array.from(el.children))\n        })\n        return new DOMNodeCollection(children)\n    }\n\n    parent(){\n        let parents = []\n        this.HTMLElementsArr.forEach(el=>{\n            if (!parents.includes(el.parentElement)) parents.push(el.parentElement)\n        })\n        return new DOMNodeCollection(parents)\n    }\n\n    find(selector){\n        let descendants = []\n        this.HTMLElementsArr.forEach(el=>{\n            descendants = descendants.concat(Array.from(el.querySelectorAll(selector)).filter(descendant=>!descendants.includes(descendant)))\n        })\n        return new DOMNodeCollection(descendants)\n    }\n\n    remove(){\n        this.HTMLElementsArr.forEach(el=>{\n            el.remove()\n        })\n    }\n\n    on(events, ...args){\n        let data \n        if (args.length>1) data = args.shift()\n        let callback = args.pop()\n        callback = callback.bind(this)\n        events.split(\" \").forEach(event=>{\n            this.HTMLElementsArr.forEach(el=>{\n                el.addEventListener(event, callback)\n                el.listener = callback\n            })\n        })\n    }\n\n    off(events){\n        events.split(\" \").forEach(event=>{\n            this.HTMLElementsArr.forEach(el=>{\n                el.removeEventListener(event, el.listener)\n            })\n        })\n    }\n}\n\nmodule.exports = DOMNodeCollection\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("let DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\")\nlet functions = []\nlet $l = function (arg){\n    if (arg instanceof HTMLElement){\n        return new DOMNodeCollection([arg])\n    } else if (typeof arg == \"string\"){\n        let elements = document.querySelectorAll(arg)\n        return new DOMNodeCollection(Array.from(elements))\n    } else if (typeof arg == \"function\"){\n        if (document.readyState === 'complete') {\n            arg()\n        }else{\n            functions.push(arg)\n            let readyLoop = setInterval(()=>{\n                if (document.readyState === 'complete'){\n                    while (functions.length > 0){\n                        functions.shift().call(this)\n                    }\n                    clearInterval(readyLoop)\n                }\n            }, 20)\n        }\n    }\n}\n\nwindow.$l = $l\n$l(()=>console.log(\"cat\"))\n$l(()=>console.log(\"cat3\"))\n$l(()=>console.log(\"cat2\"))\n\n//# sourceURL=webpack:///./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;