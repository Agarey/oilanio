webpackHotUpdate_N_E("pages/courses",{

/***/ "./src/components/Forms/SubscriptionPaymentForm/SubscriptionPaymentForm.js":
/*!*********************************************************************************!*\
  !*** ./src/components/Forms/SubscriptionPaymentForm/SubscriptionPaymentForm.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../styles/components/form.module.css */ "./styles/components/form.module.css");
/* harmony import */ var _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcryptjs */ "./node_modules/bcryptjs/dist/bcrypt.js");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../globals */ "./src/globals.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _SubscriptionCardsWrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../SubscriptionCardsWrapper */ "./src/components/SubscriptionCardsWrapper/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");



var _jsxFileName = "C:\\Server\\data\\htdocs\\oilanio-mirror\\src\\components\\Forms\\SubscriptionPaymentForm\\SubscriptionPaymentForm.js",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js")["default"];








function SubscriptionPaymentForm(props) {
  _s();

  var _this = this;

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"])();

  function prettify(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
  }

  var packages = [{
    id: 1,
    title: 'месяц',
    opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
    price: 15000
  }, {
    id: 3,
    title: 'месяца',
    opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
    price: 42000
  }, {
    id: 6,
    title: 'месяцев',
    opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
    price: 78000
  }];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0),
      selectedPack = _useState[0],
      setSelectedPack = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(1),
      selectedMonthCount = _useState2[0],
      setSelectedMonthCount = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0),
      totalPrice = _useState3[0],
      setTotalPrice = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(true),
      showPackages = _useState4[0],
      setShowPackages = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(''),
      message = _useState5[0],
      setMessage = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      ofertaCheck = _useState6[0],
      setOfertaCheck = _useState6[1];

  var createPayment = /*#__PURE__*/function () {
    var _ref = Object(C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(reference_id, price) {
      var paymentHost, secret_key, salt, paymentPayload, paymentData, result, redirectUrl;
      return C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              paymentHost = "https://finddifferences.club/proxy";
              secret_key = "CbYf5sAuv4VJyFz9cD9x";
              salt = bcryptjs__WEBPACK_IMPORTED_MODULE_5___default.a.genSaltSync(10);
              paymentPayload = {
                centerId: +localStorage.getItem(_globals__WEBPACK_IMPORTED_MODULE_6__["default"].localStorageKeys.centerId)
              };
              paymentData = {
                reference_id: reference_id,
                request_url: "".concat(_globals__WEBPACK_IMPORTED_MODULE_6__["default"].productionServerDomain, "/handlepayment"),
                back_url: "".concat(_globals__WEBPACK_IMPORTED_MODULE_6__["default"].productionServerDomain, "/handlepayment"),
                amount: price,
                description: JSON.stringify(paymentPayload),
                merchant_id: 66,
                secret_key: bcryptjs__WEBPACK_IMPORTED_MODULE_5___default.a.hashSync(reference_id + secret_key, salt)
              };
              _context.next = 7;
              return axios.post("".concat(paymentHost, "/invoice/create"), paymentData, {
                headers: {
                  'Access': 'application/json '
                }
              });

            case 7:
              result = _context.sent;

              if (!result['data']['success']) {
                _context.next = 14;
                break;
              }

              redirectUrl = result['data']['data']['redirect_url'];
              _context.next = 12;
              return router.push(redirectUrl);

            case 12:
              _context.next = 15;
              break;

            case 14:
              console.log(result);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function createPayment(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return __jsx("div", {
    className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.formBody,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 9
    }
  }, __jsx("div", {
    style: {
      width: '100%',
      display: showPackages ? 'block' : 'none'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 13
    }
  }, packages.map(function (pack) {
    return __jsx("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a["package"]),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 25
      }
    }, __jsx("hr", {
      style: {
        margin: '5px 0'
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 29
      }
    }), __jsx("div", {
      className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.packageHeader,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 29
      }
    }, __jsx("span", {
      className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.packageTitle,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 33
      }
    }, __jsx("span", {
      className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.packId,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 71
      }
    }, pack.id), " ", pack.title), __jsx("span", {
      className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.price,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 33
      }
    }, __jsx("span", {
      className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.packId,
      style: {
        fontFamily: 'Rubik Bold',
        marginRight: 10
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 37
      }
    }, prettify(pack.price)), "KZT")), pack.opportunities.map(function (title) {
      return __jsx("div", {
        className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.listItem,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 33
        }
      }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Image"], {
        src: '/violet_galochka.png',
        className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.opportunitiesImage,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 37
        }
      }), __jsx("span", {
        className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.opportunities,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 37
        }
      }, title));
    }), __jsx("button", {
      className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.btn,
      onClick: /*#__PURE__*/Object(C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return setTotalPrice(pack.price);

              case 2:
                _context2.next = 4;
                return createPayment(Math.floor(Math.random() * 100000), pack.price);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 29
      }
    }, "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C"), __jsx("hr", {
      style: {
        margin: '5px 0'
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 29
      }
    }));
  })), __jsx("div", {
    style: {
      width: '100%',
      display: showPackages ? 'none' : 'block'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 13
    }
  }, selectedPack !== 100 ? __jsx("div", {
    style: {
      width: '100%'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 29
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 33
    }
  }, "\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u043F\u0430\u043A\u0435\u0442 \u043D\u0430 ", __jsx("span", {
    style: {
      fontWeight: 'bold'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 57
    }
  }, selectedMonthCount), " \u043C\u0435\u0441\u044F\u0446\u0435\u0432."), __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 33
    }
  }), " ", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 39
    }
  }), __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 33
    }
  }, "\u041A \u043E\u043F\u043B\u0430\u0442\u0435: ", __jsx("span", {
    style: {
      fontWeight: 'bold'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 49
    }
  }, totalPrice, " KZT"), " "), __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 33
    }
  }), __jsx("button", {
    className: _styles_components_form_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.formSubmit,
    style: {
      marginTop: '10px'
    },
    onClick: /*#__PURE__*/Object(C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var referenceId;
      return C_Server_data_htdocs_oilanio_mirror_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              referenceId = Math.floor(Math.random() * 999999) + 1;
              _context3.next = 3;
              return createPayment(referenceId);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 33
    }
  }, "\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C")) : __jsx("div", {
    style: {
      width: '100%',
      textAlign: 'center'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 29
    }
  }, __jsx("span", {
    style: {
      fontWeight: 'bold',
      color: "white",
      borderBottom: '1px dashed red'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 33
    }
  }, "\u0412\u044B \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u043F\u0430\u043A\u0435\u0442 \u0434\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438!")), __jsx("div", {
    style: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 17
    }
  }, __jsx("span", {
    style: {
      color: 'white',
      fontSize: '12px',
      textDecoration: 'underline',
      cursor: "pointer"
    },
    onClick: function onClick() {
      setShowPackages(true);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 21
    }
  }, "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0432\u044B\u0431\u043E\u0440\u0443 \u043F\u0430\u043A\u0435\u0442\u043E\u0432"))));
}

_s(SubscriptionPaymentForm, "OSL04s0ZsvTcAIrickDcKkl/fk8=", false, function () {
  return [next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"]];
});

_c = SubscriptionPaymentForm;
/* harmony default export */ __webpack_exports__["default"] = (SubscriptionPaymentForm);

var _c;

$RefreshReg$(_c, "SubscriptionPaymentForm");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvRm9ybXMvU3Vic2NyaXB0aW9uUGF5bWVudEZvcm0vU3Vic2NyaXB0aW9uUGF5bWVudEZvcm0uanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiU3Vic2NyaXB0aW9uUGF5bWVudEZvcm0iLCJwcm9wcyIsInJvdXRlciIsInVzZVJvdXRlciIsInByZXR0aWZ5IiwibnVtIiwibiIsInRvU3RyaW5nIiwicmVwbGFjZSIsInBhY2thZ2VzIiwiaWQiLCJ0aXRsZSIsIm9wcG9ydHVuaXRpZXMiLCJwcmljZSIsInVzZVN0YXRlIiwic2VsZWN0ZWRQYWNrIiwic2V0U2VsZWN0ZWRQYWNrIiwic2VsZWN0ZWRNb250aENvdW50Iiwic2V0U2VsZWN0ZWRNb250aENvdW50IiwidG90YWxQcmljZSIsInNldFRvdGFsUHJpY2UiLCJzaG93UGFja2FnZXMiLCJzZXRTaG93UGFja2FnZXMiLCJtZXNzYWdlIiwic2V0TWVzc2FnZSIsIm9mZXJ0YUNoZWNrIiwic2V0T2ZlcnRhQ2hlY2siLCJjcmVhdGVQYXltZW50IiwicmVmZXJlbmNlX2lkIiwicGF5bWVudEhvc3QiLCJzZWNyZXRfa2V5Iiwic2FsdCIsImJjcnlwdCIsImdlblNhbHRTeW5jIiwicGF5bWVudFBheWxvYWQiLCJjZW50ZXJJZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnbG9iYWxzIiwibG9jYWxTdG9yYWdlS2V5cyIsInBheW1lbnREYXRhIiwicmVxdWVzdF91cmwiLCJwcm9kdWN0aW9uU2VydmVyRG9tYWluIiwiYmFja191cmwiLCJhbW91bnQiLCJkZXNjcmlwdGlvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXJjaGFudF9pZCIsImhhc2hTeW5jIiwicG9zdCIsImhlYWRlcnMiLCJyZXN1bHQiLCJyZWRpcmVjdFVybCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwic3R5bGVzIiwiZm9ybUJvZHkiLCJ3aWR0aCIsImRpc3BsYXkiLCJtYXAiLCJwYWNrIiwiY2xhc3NuYW1lcyIsIm1hcmdpbiIsInBhY2thZ2VIZWFkZXIiLCJwYWNrYWdlVGl0bGUiLCJwYWNrSWQiLCJmb250RmFtaWx5IiwibWFyZ2luUmlnaHQiLCJsaXN0SXRlbSIsIm9wcG9ydHVuaXRpZXNJbWFnZSIsImJ0biIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImZvbnRXZWlnaHQiLCJmb3JtU3VibWl0IiwibWFyZ2luVG9wIiwicmVmZXJlbmNlSWQiLCJ0ZXh0QWxpZ24iLCJjb2xvciIsImJvcmRlckJvdHRvbSIsImp1c3RpZnlDb250ZW50IiwiZm9udFNpemUiLCJ0ZXh0RGVjb3JhdGlvbiIsImN1cnNvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBQ0EsSUFBTUEsS0FBSyxHQUFHQyxtQkFBTyxDQUFDLDRDQUFELENBQVAsV0FBZDs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0MsdUJBQVQsQ0FBaUNDLEtBQWpDLEVBQXdDO0FBQUE7O0FBQUE7O0FBRXhDLE1BQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEI7O0FBR0ksV0FBU0MsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDbkIsUUFBSUMsQ0FBQyxHQUFHRCxHQUFHLENBQUNFLFFBQUosRUFBUjtBQUNBLFdBQU9ELENBQUMsQ0FBQ0UsT0FBRixDQUFVLGlDQUFWLEVBQTZDLE9BQU8sR0FBcEQsQ0FBUDtBQUNIOztBQUVELE1BQU1DLFFBQVEsR0FBRyxDQUNiO0FBQ0lDLE1BQUUsRUFBRSxDQURSO0FBRUlDLFNBQUssRUFBRSxPQUZYO0FBR0lDLGlCQUFhLEVBQUUsQ0FBQyxrQ0FBRCxFQUFxQyxrQkFBckMsRUFBeUQsNEJBQXpELEVBQXVGLGlCQUF2RixFQUEwRyxrQkFBMUcsQ0FIbkI7QUFJSUMsU0FBSyxFQUFFO0FBSlgsR0FEYSxFQU9iO0FBQ0lILE1BQUUsRUFBRSxDQURSO0FBRUlDLFNBQUssRUFBRSxRQUZYO0FBR0lD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QUFELENBRnFEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUgsRUFBekU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3REFWSixDQUZSLEdBb0JRO0FBQUssU0FBSyxFQUFFO0FBQUNwQixXQUFLLEVBQUUsTUFBUjtBQUFnQnFCLGVBQVMsRUFBRTtBQUEzQixLQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUFNLFNBQUssRUFBRTtBQUFDSixnQkFBVSxFQUFFLE1BQWI7QUFBcUJLLFdBQUssRUFBRSxPQUE1QjtBQUFxQ0Msa0JBQVksRUFBRTtBQUFuRCxLQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0xBREosQ0F0QmhCLEVBMkJJO0FBQUssU0FBSyxFQUFFO0FBQUN0QixhQUFPLEVBQUMsTUFBVDtBQUFpQkQsV0FBSyxFQUFFLE1BQXhCO0FBQWdDd0Isb0JBQWMsRUFBRTtBQUFoRCxLQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUFNLFNBQUssRUFBRTtBQUFDRixXQUFLLEVBQUUsT0FBUjtBQUFpQkcsY0FBUSxFQUFFLE1BQTNCO0FBQW1DQyxvQkFBYyxFQUFFLFdBQW5EO0FBQWdFQyxZQUFNLEVBQUU7QUFBeEUsS0FBYjtBQUNNLFdBQU8sRUFBRyxtQkFBTTtBQUNaaEUscUJBQWUsQ0FBQyxJQUFELENBQWY7QUFDSCxLQUhQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUpBREosQ0EzQkosQ0E5REosQ0FESjtBQW9HSDs7R0E3S1F0Qix1QjtVQUVNRyxxRDs7O0tBRk5ILHVCO0FBK0tNQSxzRkFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9jb3Vyc2VzLmE1ZDhhYTU0OGFlNmRlYzFkNmVjLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9mb3JtLm1vZHVsZS5jc3MnXHJcbmNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi4vLi4vLi4vZ2xvYmFsc1wiO1xyXG5pbXBvcnQge3VzZVJvdXRlcn0gZnJvbSBcIm5leHQvcm91dGVyXCI7XHJcbmltcG9ydCBTdWJzY3JpcHRpb25DYXJkc1dyYXBwZXIgZnJvbSBcIi4uLy4uL1N1YnNjcmlwdGlvbkNhcmRzV3JhcHBlclwiO1xyXG5pbXBvcnQge0ltYWdlfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XHJcblxyXG5mdW5jdGlvbiBTdWJzY3JpcHRpb25QYXltZW50Rm9ybShwcm9wcykge1xyXG5cclxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXR0aWZ5KG51bSkge1xyXG4gICAgICAgIHZhciBuID0gbnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIG4ucmVwbGFjZSgvKFxcZHsxLDN9KD89KD86XFxkXFxkXFxkKSsoPyFcXGQpKSkvZywgXCIkMVwiICsgJyAnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWNrYWdlcyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICB0aXRsZTogJ9C80LXRgdGP0YYnLFxyXG4gICAgICAgICAgICBvcHBvcnR1bml0aWVzOiBbXCLQndC10L7Qs9GA0LDQvdC40YfQtdC90L3QvtC1INGA0LDQt9C80LXRidC10L3QuNC1INC60YPRgNGB0L7QslwiLCBcItCf0YPQsdC70LjQutCw0YbQuNGPINCw0LrRhtC40LhcIiwgXCLQkNC60YLQuNCy0LDRhtC40Y8g0LvQuNGH0L3QvtCz0L4g0LrQsNCx0LjQvdC10YLQsFwiLCBcItCg0LDRgdGB0YvQu9C60LAg0LfQsNGP0LLQvtC6XCIsIFwi0J7QsdGA0LDQsdC+0YLQutCwINC30LDRj9Cy0L7QulwiXSxcclxuICAgICAgICAgICAgcHJpY2U6IDE1MDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICB0aXRsZTogJ9C80LXRgdGP0YbQsCcsXHJcbiAgICAgICAgICAgIG9wcG9ydHVuaXRpZXM6IFtcItCd0LXQvtCz0YDQsNC90LjRh9C10L3QvdC+0LUg0YDQsNC30LzQtdGJ0LXQvdC40LUg0LrRg9GA0YHQvtCyXCIsIFwi0J/Rg9Cx0LvQuNC60LDRhtC40Y8g0LDQutGG0LjQuFwiLCBcItCQ0LrRgtC40LLQsNGG0LjRjyDQu9C40YfQvdC+0LPQviDQutCw0LHQuNC90LXRgtCwXCIsIFwi0KDQsNGB0YHRi9C70LrQsCDQt9Cw0Y/QstC+0LpcIiwgXCLQntCx0YDQsNCx0L7RgtC60LAg0LfQsNGP0LLQvtC6XCJdLFxyXG4gICAgICAgICAgICBwcmljZTogNDIwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDYsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn0LzQtdGB0Y/RhtC10LInLFxyXG4gICAgICAgICAgICBvcHBvcnR1bml0aWVzOiBbXCLQndC10L7Qs9GA0LDQvdC40YfQtdC90L3QvtC1INGA0LDQt9C80LXRidC10L3QuNC1INC60YPRgNGB0L7QslwiLCBcItCf0YPQsdC70LjQutCw0YbQuNGPINCw0LrRhtC40LhcIiwgXCLQkNC60YLQuNCy0LDRhtC40Y8g0LvQuNGH0L3QvtCz0L4g0LrQsNCx0LjQvdC10YLQsFwiLCBcItCg0LDRgdGB0YvQu9C60LAg0LfQsNGP0LLQvtC6XCIsIFwi0J7QsdGA0LDQsdC+0YLQutCwINC30LDRj9Cy0L7QulwiXSxcclxuICAgICAgICAgICAgcHJpY2U6IDc4MDAwXHJcbiAgICAgICAgfSxcclxuICAgIF1cclxuXHJcbiAgICBjb25zdCBbc2VsZWN0ZWRQYWNrLCBzZXRTZWxlY3RlZFBhY2tdID0gdXNlU3RhdGUoMCk7XHJcbiAgICBjb25zdCBbc2VsZWN0ZWRNb250aENvdW50LCBzZXRTZWxlY3RlZE1vbnRoQ291bnRdID0gdXNlU3RhdGUoMSk7XHJcbiAgICBjb25zdCBbdG90YWxQcmljZSwgc2V0VG90YWxQcmljZV0gPSB1c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IFtzaG93UGFja2FnZXMsIHNldFNob3dQYWNrYWdlc10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBbb2ZlcnRhQ2hlY2ssIHNldE9mZXJ0YUNoZWNrXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVQYXltZW50ID0gYXN5bmMgKHJlZmVyZW5jZV9pZCwgcHJpY2UpID0+IHtcclxuICAgICAgICBsZXQgcGF5bWVudEhvc3QgPSBcImh0dHBzOi8vZmluZGRpZmZlcmVuY2VzLmNsdWIvcHJveHlcIjtcclxuICAgICAgICBsZXQgc2VjcmV0X2tleSA9IFwiQ2JZZjVzQXV2NFZKeUZ6OWNEOXhcIjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBheW1lbnRQYXlsb2FkID0ge1xyXG4gICAgICAgICAgICBjZW50ZXJJZDogK2xvY2FsU3RvcmFnZS5nZXRJdGVtKGdsb2JhbHMubG9jYWxTdG9yYWdlS2V5cy5jZW50ZXJJZCksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGF5bWVudERhdGEgPSB7XHJcbiAgICAgICAgICAgIHJlZmVyZW5jZV9pZDogcmVmZXJlbmNlX2lkLFxyXG4gICAgICAgICAgICByZXF1ZXN0X3VybDogYCR7Z2xvYmFscy5wcm9kdWN0aW9uU2VydmVyRG9tYWlufS9oYW5kbGVwYXltZW50YCxcclxuICAgICAgICAgICAgYmFja191cmw6IGAke2dsb2JhbHMucHJvZHVjdGlvblNlcnZlckRvbWFpbn0vaGFuZGxlcGF5bWVudGAsXHJcbiAgICAgICAgICAgIGFtb3VudDogcHJpY2UsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBKU09OLnN0cmluZ2lmeShwYXltZW50UGF5bG9hZCksXHJcbiAgICAgICAgICAgIG1lcmNoYW50X2lkOiA2NixcclxuICAgICAgICAgICAgc2VjcmV0X2tleTogYmNyeXB0Lmhhc2hTeW5jKHJlZmVyZW5jZV9pZCArIHNlY3JldF9rZXksIHNhbHQpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MucG9zdChcclxuICAgICAgICAgICAgYCR7cGF5bWVudEhvc3R9L2ludm9pY2UvY3JlYXRlYCxcclxuICAgICAgICAgICAgcGF5bWVudERhdGEsXHJcbiAgICAgICAgICAgIHtoZWFkZXJzOiB7J0FjY2Vzcyc6ICdhcHBsaWNhdGlvbi9qc29uICd9fVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmKHJlc3VsdFsnZGF0YSddWydzdWNjZXNzJ10pe1xyXG4gICAgICAgICAgICBsZXQgcmVkaXJlY3RVcmwgPSByZXN1bHRbJ2RhdGEnXVsnZGF0YSddWydyZWRpcmVjdF91cmwnXTtcclxuICAgICAgICAgICAgYXdhaXQgcm91dGVyLnB1c2gocmVkaXJlY3RVcmwpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb3JtQm9keX0gPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgZGlzcGxheTogc2hvd1BhY2thZ2VzID8gJ2Jsb2NrJyA6ICdub25lJ319PlxyXG4gICAgICAgICAgICAgICAge3BhY2thZ2VzLm1hcCgocGFjayk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHN0eWxlcy5wYWNrYWdlKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIgc3R5bGU9e3ttYXJnaW46ICc1cHggMCd9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhY2thZ2VIZWFkZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnBhY2thZ2VUaXRsZX0+PHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMucGFja0lkfT57cGFjay5pZH08L3NwYW4+IHtwYWNrLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5wcmljZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnBhY2tJZH0gc3R5bGU9e3tmb250RmFtaWx5OiAnUnViaWsgQm9sZCcsIG1hcmdpblJpZ2h0OiAxMH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXR0aWZ5KHBhY2sucHJpY2UpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+S1pUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGFjay5vcHBvcnR1bml0aWVzLm1hcCh0aXRsZSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5saXN0SXRlbX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9eycvdmlvbGV0X2dhbG9jaGthLnBuZyd9IGNsYXNzTmFtZT17c3R5bGVzLm9wcG9ydHVuaXRpZXNJbWFnZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5vcHBvcnR1bml0aWVzfT57dGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2V0VG90YWxQcmljZShwYWNrLnByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlUGF5bWVudChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwKSwgcGFjay5wcmljZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPtCf0L7QtNC60LvRjtGH0LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIgc3R5bGU9e3ttYXJnaW46ICc1cHggMCd9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgey8qPHNwYW4gc3R5bGU9e3tmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICdibGFjaycsIG1hcmdpblRvcDogJzEwcHgnfX0+e21lc3NhZ2V9PC9zcGFuPiA8YnIvPiovfVxyXG4gICAgICAgICAgICAgICAgey8qPGxhYmVsIHN0eWxlPXt7Zm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnd2hpdGUnLCBtYXJnaW5Ub3A6ICcxMHB4J319PiovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgIDxpbnB1dCovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICBvbkNsaWNrPXsoKSA9PiB7Ki99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgICAgICAgICBzZXRPZmVydGFDaGVjayghb2ZlcnRhQ2hlY2spKi99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgICAgIH19Ki99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgLz4gPGZvbnQgc3R5bGU9e3tjb2xvcjogJ2JsYWNrJ319PiDQryDQv9GA0LjQvdC40LzQsNGOINGD0YHQu9C+0LLQuNGPIDwvZm9udD4gPGEgaHJlZj1cIi9vZmZlclwiIHN0eWxlPXt7Y29sb3I6ICdibHVlJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnfX0+0L/Rg9Cx0LvQuNGH0L3QvtC5INC+0YTQtdGA0YLRiy48L2E+Ki99XHJcbiAgICAgICAgICAgICAgICB7Lyo8L2xhYmVsPiA8YnIvPiovfVxyXG4gICAgICAgICAgICAgICAgey8qPHNwYW4gc3R5bGU9e3tjb2xvcjogJ2JsYWNrJ319PtCS0YvQsdC10YDQuNGC0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0LzQtdGB0Y/RhtC10LIg0L/QvtC00L/QuNGB0LrQuDwvc3Bhbj4qL31cclxuXHJcbiAgICAgICAgICAgICAgICB7Lyo8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Ub3A6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcid9fT4qL31cclxuICAgICAgICAgICAgICAgIHsvKiAgICA8c2VsZWN0IG9uQ2hhbmdlPXsgZXZlbnQgPT4gc2V0U2VsZWN0ZWRNb250aENvdW50KGV2ZW50LnRhcmdldC52YWx1ZSl9IGNsYXNzTmFtZT17c3R5bGVzLnBheW1lbnRGb3JtU2VsZWN0fSA+Ki99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgICAgIDxvcHRpb24gdmFsdWU9ezF9PjEg0LzQtdGB0Y/Rhjwvb3B0aW9uPiovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICA8b3B0aW9uIHZhbHVlPXszfT4zINC80LXRgdGP0YbQsDwvb3B0aW9uPiovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICA8b3B0aW9uIHZhbHVlPXs2fT42INC80LXRgdGP0YbQtdCyPC9vcHRpb24+Ki99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgPC9zZWxlY3Q+Ki99XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmZvcm1TdWJtaXR9IG9uQ2xpY2s9eygpID0+IHsqL31cclxuICAgICAgICAgICAgICAgIHsvKiAgICAgICAgaWYob2ZlcnRhQ2hlY2speyovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICAgICAgc2V0TWVzc2FnZSgnJykqL31cclxuICAgICAgICAgICAgICAgIHsvKiAgICAgICAgICAgIHNldFNob3dQYWNrYWdlcyhmYWxzZSk7Ki99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgICAgICAgICBzZXRUb3RhbFByaWNlKHBhY2thZ2VzWzBdLnBlcmlvZHMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5tb250aENvdW50ID09PSBOdW1iZXIoc2VsZWN0ZWRNb250aENvdW50KSlbMF0ucHJpY2UpOyovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICB9IGVsc2UgeyovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICAgICAgc2V0TWVzc2FnZSgn0J/RgNC+0YfRgtC40YLQtSDQv9GD0LHQu9C40YfQvdGD0Y4g0L7RhNC10YDRgtGDINC4INC00LDQudGC0LUg0YHQstC+0LUg0YHQvtCz0LvQsNGB0LjQtSEnKSovfVxyXG4gICAgICAgICAgICAgICAgey8qICAgICAgICB9Ki99XHJcbiAgICAgICAgICAgICAgICB7LyogICAgfX0+0J/QtdGA0LXQudGC0Lgg0Log0L7Qv9C70LDRgtC1PC9idXR0b24+Ki99XHJcbiAgICAgICAgICAgICAgICB7Lyo8L2Rpdj4qL31cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgZGlzcGxheTogc2hvd1BhY2thZ2VzID8gJ25vbmUnIDogJ2Jsb2NrJ319PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUGFjayAhPT0gMTAwID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0JLRiyDQstGL0LHRgNCw0LvQuCDQv9Cw0LrQtdGCINC90LAgPHNwYW4gc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT57c2VsZWN0ZWRNb250aENvdW50fTwvc3Bhbj4g0LzQtdGB0Y/RhtC10LIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPiA8YnIvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QmiDQvtC/0LvQsNGC0LU6IDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnfX0+e3RvdGFsUHJpY2V9IEtaVDwvc3Bhbj4gPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuZm9ybVN1Ym1pdH0gc3R5bGU9e3ttYXJnaW5Ub3A6ICcxMHB4J319IG9uQ2xpY2s9eyBhc3luYygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlZmVyZW5jZUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTk5OTk5KSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZVBheW1lbnQocmVmZXJlbmNlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PtCe0L/Qu9Cw0YLQuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2NlbnRlcicsIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogXCJ3aGl0ZVwiLCBib3JkZXJCb3R0b206ICcxcHggZGFzaGVkIHJlZCd9fT7QktGLINC90LUg0LLRi9Cx0YDQsNC70Lgg0L/QsNC60LXRgiDQtNC70Y8g0L/QvtC00L/QuNGB0LrQuCE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6J2ZsZXgnLCB3aWR0aDogJzEwMCUnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcid9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2NvbG9yOiAnd2hpdGUnLCBmb250U2l6ZTogJzEycHgnLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIGN1cnNvcjogXCJwb2ludGVyXCJ9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dQYWNrYWdlcyh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19PtCS0LXRgNC90YPRgtGM0YHRjyDQuiDQstGL0LHQvtGA0YMg0L/QsNC60LXRgtC+0LI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaXB0aW9uUGF5bWVudEZvcm07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=