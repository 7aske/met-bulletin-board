(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/error-page/error-page.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/error-page/error-page.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<img src=\"../../assets/error.jpg\" class=\"error\" alt=\"404-error\">");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home-slidehow/home-slidehow.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home-slidehow/home-slidehow.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"homeWrapper\" (mousemove)=\"stopSlideTimer()\">\n    <div class=\"pageConrols\">\n        <span class=\"pageIndexDot\" *ngFor=\"let slide of slides;let i = index\"\n            [ngClass]=\"{'active': i === stepper.selectedIndex }\" (click)=\"stepper.selectedIndex = i\"></span>\n    </div>\n    <mat-horizontal-stepper #stepper>\n        <mat-step *ngFor=\"let slide of slides\">\n            <div class=\"pageWrapper\" [ngStyle]=\"{ 'background-image': 'url(' + slide.slideImageUrl + ')'}\">\n                <div class=\"pageContent\">\n                    <h1 class=\"slideTitle\">{{slide.slideTitle}}</h1>\n                    <div *ngIf=\"slide.poll != null\" class=\"voteContainer\">\n                        <h2>{{slide.poll.questionText}}</h2>\n                        <div class=\"pollWrapper\">\n                            <mat-radio-group aria-label=\"Izaberite odgovor\">\n                                <div *ngFor=\"let choice of slide.poll.questionOptions\" class=\"pollChoice\">\n                                    <mat-radio-button [value]=\"choice\">\n                                        {{choice}}</mat-radio-button>\n                                </div>\n                            </mat-radio-group>\n                            <mat-divider></mat-divider>\n                            <div>\n                                <mat-form-field>\n                                    <input matInput placeholder=\"Index\" value=\"\" (keydown)=\"handleNumberInput($event)\">\n                                </mat-form-field>\n                                <button mat-flat-button color=\"green\">Glasaj!</button>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </mat-step>\n    </mat-horizontal-stepper>\n</div>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _error_page_error_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error-page/error-page.component */ "./src/app/error-page/error-page.component.ts");
/* harmony import */ var _home_slidehow_home_slidehow_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home-slidehow/home-slidehow.component */ "./src/app/home-slidehow/home-slidehow.component.ts");





const routes = [
    {
        path: '',
        component: _home_slidehow_home_slidehow_component__WEBPACK_IMPORTED_MODULE_4__["HomeSlidehowComponent"]
    },
    {
        path: '**',
        component: _error_page_error_page_component__WEBPACK_IMPORTED_MODULE_3__["ErrorPageComponent"]
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'bulletboard-frontend';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_slidehow_home_slidehow_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home-slidehow/home-slidehow.component */ "./src/app/home-slidehow/home-slidehow.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm2015/autocomplete.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm2015/datepicker.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm2015/form-field.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm2015/radio.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm2015/select.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm2015/slider.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm2015/slide-toggle.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm2015/menu.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm2015/sidenav.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm2015/toolbar.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm2015/list.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm2015/grid-list.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm2015/card.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm2015/stepper.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm2015/tabs.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm2015/expansion.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm2015/button-toggle.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm2015/chips.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm2015/progress-spinner.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm2015/progress-bar.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm2015/tooltip.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm2015/snack-bar.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm2015/sort.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
/* harmony import */ var _error_page_error_page_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./error-page/error-page.component */ "./src/app/error-page/error-page.component.ts");






































let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _home_slidehow_home_slidehow_component__WEBPACK_IMPORTED_MODULE_5__["HomeSlidehowComponent"],
            _error_page_error_page_component__WEBPACK_IMPORTED_MODULE_36__["ErrorPageComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__["MatRadioModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_13__["MatSelectModule"],
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_14__["MatSliderModule"],
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__["MatSlideToggleModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__["MatMenuModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__["MatSidenavModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__["MatToolbarModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_19__["MatListModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_20__["MatGridListModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_21__["MatCardModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__["MatStepperModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__["MatTabsModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_24__["MatExpansionModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_25__["MatButtonToggleModule"],
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_26__["MatChipsModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__["MatIconModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__["MatProgressSpinnerModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__["MatProgressBarModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__["MatDialogModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__["MatTooltipModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_32__["MatSnackBarModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_33__["MatTableModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_34__["MatSortModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_35__["MatPaginatorModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/error-page/error-page.component.css":
/*!*****************************************************!*\
  !*** ./src/app/error-page/error-page.component.css ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("img{\n    height: 99%;\n    width: 100%;    \n}\nbody{\n    background-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZXJyb3ItcGFnZS9lcnJvci1wYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztBQUNmO0FBQ0E7SUFDSSx1QkFBdUI7QUFDM0IiLCJmaWxlIjoic3JjL2FwcC9lcnJvci1wYWdlL2Vycm9yLXBhZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImltZ3tcbiAgICBoZWlnaHQ6IDk5JTtcbiAgICB3aWR0aDogMTAwJTsgICAgXG59XG5ib2R5e1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/error-page/error-page.component.ts":
/*!****************************************************!*\
  !*** ./src/app/error-page/error-page.component.ts ***!
  \****************************************************/
/*! exports provided: ErrorPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPageComponent", function() { return ErrorPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ErrorPageComponent = class ErrorPageComponent {
    constructor() { }
    ngOnInit() {
    }
};
ErrorPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-error-page',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./error-page.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/error-page/error-page.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./error-page.component.css */ "./src/app/error-page/error-page.component.css")).default]
    })
], ErrorPageComponent);



/***/ }),

/***/ "./src/app/home-slidehow/home-slidehow.component.css":
/*!***********************************************************!*\
  !*** ./src/app/home-slidehow/home-slidehow.component.css ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep *{\r\n    transition: ease 0.2s all !important;\r\n    font-family: Verdana,Geneva,sans-serif !important;\r\n}\r\n::ng-deep .mat-horizontal-stepper-header-container{\r\n    display: none !important;\r\n    /* display: initial; */\r\n}\r\n::ng-deep .mat-horizontal-content-container{\r\n    padding: 0 !important;\r\n}\r\n.pageWrapper{\r\n    height: 100vh;\r\n    overflow: auto;\r\n}\r\n.pageContent{\r\n    margin-top: 5em;\r\n}\r\n.slideTitle{\r\n    margin-top: 5em;\r\n    text-align: center;\r\n    color: whitesmoke;\r\n}\r\n.voteContainer{\r\n    font-weight: bold;\r\n    text-align: left;\r\n    max-width: 30%;\r\n    margin-left: 5em;\r\n    margin-top: 6em;\r\n    padding: 2em;\r\n    background-color: rgba(255,255,255,0.5);\r\n    box-shadow: 10px 10px 21px -2px rgba(0,0,0,0.5);\r\n    -webkit-box-shadow: 10px 10px 21px -2px rgba(0,0,0,0.5);\r\n    -moz-box-shadow: 10px 10px 21px -2px rgba(0,0,0,0.5);\r\n}\r\n.voteContainer h2{\r\n    text-align: center;\r\n}\r\n.voteContainer mat-form-field, .voteContainer button{\r\n    margin-top: 1em;\r\n    width: 6em;\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\n.voteContainer mat-form-field+button{\r\n    margin-left: 2em;\r\n}\r\n::ng-deep input.mat-input-element {\r\ncolor: #a70532 !important;\r\n}\r\n::ng-deep .mat-form-field.mat-focused .mat-form-field-label {\r\ncolor: #a70532 !important;\r\n}\r\n::ng-deep .mat-focused .mat-form-field-underline .mat-form-field-ripple{\r\nbackground-color: #a70532 !important;\r\n}\r\n.pollWrapper{\r\n    margin-left: 2em;\r\n}\r\nmat-divider{\r\n    margin-top: 1em;\r\n    margin-right: 2em;\r\n}\r\n.pollWrapper mat-divider+div{\r\n    margin-right: 2em;\r\n    text-align: center;\r\n}\r\n.pollChoice + .pollChoice{\r\n    margin-top: .5em;\r\n}\r\n.mat-raised-button.mat-green, .mat-flat-button.mat-green{\r\nbackground-color: #a70532;\r\ncolor: white;\r\n}\r\n::ng-deep .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle , .mat-radio-outer-circle {\r\nborder-color: #a70532 !important;\r\n}\r\n::ng-deep .mat-radio-button.mat-accent .mat-radio-inner-circle{\r\nbackground-color: #a70532 !important;\r\n}\r\n.pageConrols{\r\nposition: absolute;\r\nmargin-top: 2em;\r\ntext-align: center;\r\nwidth: 100%;\r\nopacity: 1 !important;\r\n}\r\n.active{\r\n    opacity: 1 !important;\r\n    background-color: #a70532 !important;\r\n}\r\n.pageIndexDot{\r\n    box-sizing: border-box;\r\n    height: 1em;\r\n    width: 1em;\r\n    display: inline-block;\r\n    border-radius: 50%;\r\n    background-color: white;\r\n    opacity: 0.5;\r\n    border:solid 1px #a70532 !important;\r\n}\r\n.pageIndexDot:hover{\r\n    opacity: 0.75;\r\n    border:solid 4px #a70532 !important;\r\n}\r\n.pageIndexDot+.pageIndexDot{\r\n    margin-left: 2.5em;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS1zbGlkZWhvdy9ob21lLXNsaWRlaG93LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQ0FBb0M7SUFDcEMsaURBQWlEO0FBQ3JEO0FBQ0E7SUFDSSx3QkFBd0I7SUFDeEIsc0JBQXNCO0FBQzFCO0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7QUFHQTtJQUNJLGFBQWE7SUFDYixjQUFjO0FBQ2xCO0FBRUE7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGlCQUFpQjtBQUNyQjtBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixZQUFZO0lBQ1osdUNBQXVDO0lBQ3ZDLCtDQUErQztJQUMvQyx1REFBdUQ7SUFDdkQsb0RBQW9EO0FBQ3hEO0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7QUFFQTtJQUNJLGVBQWU7SUFDZixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLGlCQUFpQjtBQUNyQjtBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCO0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7QUFDckI7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixrQkFBa0I7QUFDdEI7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjtBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCLFlBQVk7QUFDWjtBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFFQTtBQUNBLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2Ysa0JBQWtCO0FBQ2xCLFdBQVc7QUFDWCxxQkFBcUI7QUFDckI7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixvQ0FBb0M7QUFDeEM7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixXQUFXO0lBQ1gsVUFBVTtJQUNWLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixtQ0FBbUM7QUFDdkM7QUFFRTtJQUNFLGFBQWE7SUFDYixtQ0FBbUM7QUFDdkM7QUFFRTtJQUNFLGtCQUFrQjtBQUN0QiIsImZpbGUiOiJzcmMvYXBwL2hvbWUtc2xpZGVob3cvaG9tZS1zbGlkZWhvdy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwICp7XHJcbiAgICB0cmFuc2l0aW9uOiBlYXNlIDAuMnMgYWxsICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LWZhbWlseTogVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xyXG59XHJcbjo6bmctZGVlcCAubWF0LWhvcml6b250YWwtc3RlcHBlci1oZWFkZXItY29udGFpbmVye1xyXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgLyogZGlzcGxheTogaW5pdGlhbDsgKi9cclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXQtaG9yaXpvbnRhbC1jb250ZW50LWNvbnRhaW5lcntcclxuICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuXHJcbi5wYWdlV3JhcHBlcntcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuLnBhZ2VDb250ZW50e1xyXG4gICAgbWFyZ2luLXRvcDogNWVtO1xyXG59XHJcbi5zbGlkZVRpdGxle1xyXG4gICAgbWFyZ2luLXRvcDogNWVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6IHdoaXRlc21va2U7XHJcbn1cclxuXHJcbi52b3RlQ29udGFpbmVye1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgbWF4LXdpZHRoOiAzMCU7XHJcbiAgICBtYXJnaW4tbGVmdDogNWVtO1xyXG4gICAgbWFyZ2luLXRvcDogNmVtO1xyXG4gICAgcGFkZGluZzogMmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjUpO1xyXG4gICAgYm94LXNoYWRvdzogMTBweCAxMHB4IDIxcHggLTJweCByZ2JhKDAsMCwwLDAuNSk7XHJcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDEwcHggMTBweCAyMXB4IC0ycHggcmdiYSgwLDAsMCwwLjUpO1xyXG4gICAgLW1vei1ib3gtc2hhZG93OiAxMHB4IDEwcHggMjFweCAtMnB4IHJnYmEoMCwwLDAsMC41KTtcclxufVxyXG5cclxuLnZvdGVDb250YWluZXIgaDJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi52b3RlQ29udGFpbmVyIG1hdC1mb3JtLWZpZWxkLCAudm90ZUNvbnRhaW5lciBidXR0b257XHJcbiAgICBtYXJnaW4tdG9wOiAxZW07XHJcbiAgICB3aWR0aDogNmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi52b3RlQ29udGFpbmVyIG1hdC1mb3JtLWZpZWxkK2J1dHRvbntcclxuICAgIG1hcmdpbi1sZWZ0OiAyZW07XHJcbn1cclxuXHJcbjo6bmctZGVlcCBpbnB1dC5tYXQtaW5wdXQtZWxlbWVudCB7XHJcbmNvbG9yOiAjYTcwNTMyICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcclxuY29sb3I6ICNhNzA1MzIgIWltcG9ydGFudDtcclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIC5tYXQtZm9ybS1maWVsZC1yaXBwbGV7XHJcbmJhY2tncm91bmQtY29sb3I6ICNhNzA1MzIgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnBvbGxXcmFwcGVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJlbTtcclxufVxyXG5cclxubWF0LWRpdmlkZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiAxZW07XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDJlbTtcclxufVxyXG5cclxuLnBvbGxXcmFwcGVyIG1hdC1kaXZpZGVyK2RpdntcclxuICAgIG1hcmdpbi1yaWdodDogMmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ucG9sbENob2ljZSArIC5wb2xsQ2hvaWNle1xyXG4gICAgbWFyZ2luLXRvcDogLjVlbTtcclxufVxyXG5cclxuLm1hdC1yYWlzZWQtYnV0dG9uLm1hdC1ncmVlbiwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtZ3JlZW57XHJcbmJhY2tncm91bmQtY29sb3I6ICNhNzA1MzI7XHJcbmNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXQtcmFkaW8tYnV0dG9uLm1hdC1hY2NlbnQubWF0LXJhZGlvLWNoZWNrZWQgLm1hdC1yYWRpby1vdXRlci1jaXJjbGUgLCAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSB7XHJcbmJvcmRlci1jb2xvcjogI2E3MDUzMiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG46Om5nLWRlZXAgLm1hdC1yYWRpby1idXR0b24ubWF0LWFjY2VudCAubWF0LXJhZGlvLWlubmVyLWNpcmNsZXtcclxuYmFja2dyb3VuZC1jb2xvcjogI2E3MDUzMiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ucGFnZUNvbnJvbHN7XHJcbnBvc2l0aW9uOiBhYnNvbHV0ZTtcclxubWFyZ2luLXRvcDogMmVtO1xyXG50ZXh0LWFsaWduOiBjZW50ZXI7XHJcbndpZHRoOiAxMDAlO1xyXG5vcGFjaXR5OiAxICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5hY3RpdmV7XHJcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTcwNTMyICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5wYWdlSW5kZXhEb3R7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgaGVpZ2h0OiAxZW07XHJcbiAgICB3aWR0aDogMWVtO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBvcGFjaXR5OiAwLjU7XHJcbiAgICBib3JkZXI6c29saWQgMXB4ICNhNzA1MzIgIWltcG9ydGFudDtcclxufVxyXG5cclxuICAucGFnZUluZGV4RG90OmhvdmVye1xyXG4gICAgb3BhY2l0eTogMC43NTtcclxuICAgIGJvcmRlcjpzb2xpZCA0cHggI2E3MDUzMiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4gIC5wYWdlSW5kZXhEb3QrLnBhZ2VJbmRleERvdHtcclxuICAgIG1hcmdpbi1sZWZ0OiAyLjVlbTtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/home-slidehow/home-slidehow.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/home-slidehow/home-slidehow.component.ts ***!
  \**********************************************************/
/*! exports provided: HomeSlidehowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeSlidehowComponent", function() { return HomeSlidehowComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let HomeSlidehowComponent = class HomeSlidehowComponent {
    constructor() {
        this.slides = [
            { slideID: 0, slideTitle: "Mnogo dobar title! #1", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 0, questionText: "Koliko puta pijes kafu dnevno?", questionOptions: [1, 2, 3, 4, 5] } },
            { slideID: 2, slideTitle: "Mnogo dobar title! #2", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 1, questionText: "Koliko puta pijes kafu nedeljno?", questionOptions: [1, 2, 3, 4, 5] } },
            { slideID: 3, slideTitle: "Mnogo dobar title! #3", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 2, questionText: "Koliko puta pijes kafu mesecno?", questionOptions: [1, 2, 3, 4, 5] } },
            { slideID: 4, slideTitle: "Mnogo dobar title! #4", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 3, questionText: "Koliko puta pijes kafu godisnje?", questionOptions: [1, 2, 3, 4, 5] } },
            { slideID: 5, slideTitle: "Mnogo dobar title! #5", slideBodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim mattis enim, nec blandit augue tempor at. Proin eu iaculis velit. Quisque commodo mi in elit volutpat blandit non ut sem. ", slideImageUrl: "https://unsplash.it/1920/1080", poll: { questionID: 4, questionText: "Koliko puta pijes kafu na sat?", questionOptions: [1, 2, 3, 4, 5] } }
        ];
    }
    ngOnInit() {
        this.startSlides();
    }
    startSlides() {
        this.slideTimer = setInterval(() => {
            this.prevSlide = this.stepper.selectedIndex;
            this.stepper.next();
            if (this.prevSlide == this.stepper.selectedIndex)
                this.stepper.selectedIndex = 0;
        }, 5000);
    }
    stopSlideTimer() {
        clearInterval(this.slideTimer);
    }
    handleNumberInput(event) {
        if (event.key === 'Backspace')
            return;
        if (event.key <= '0' || event.key >= '9') {
            event.preventDefault();
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('stepper', { static: false })
], HomeSlidehowComponent.prototype, "stepper", void 0);
HomeSlidehowComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home-slidehow',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home-slidehow.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home-slidehow/home-slidehow.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home-slidehow.component.css */ "./src/app/home-slidehow/home-slidehow.component.css")).default]
    })
], HomeSlidehowComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");






if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/nik/Code/isum/met-bulletin-board/src/bulletboard-frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map