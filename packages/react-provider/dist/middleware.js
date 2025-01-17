"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var asyncMiddleware = function asyncMiddleware(store) {
  return function (next) {
    return /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(action) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof action.payload !== "function")) {
                  _context.next = 3;
                  break;
                }

                next(action);
                return _context.abrupt("return");

              case 3:
                store.dispatch({
                  type: "".concat(action.type, "/PENDING")
                });
                _context.prev = 4;
                _context.next = 7;
                return action.payload(store.dispatch, store.getState);

              case 7:
                result = _context.sent;
                store.dispatch({
                  type: "".concat(action.type, "/DONE"),
                  payload: result
                });
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                store.dispatch({
                  type: "".concat(action.type, "/ERROR"),
                  ex: _context.t0
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

var _default = [asyncMiddleware];
exports["default"] = _default;