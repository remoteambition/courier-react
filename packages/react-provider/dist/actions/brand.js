"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrand = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var brandProps = "\nsettings {\n  colors {\n    primary\n    secondary\n    tertiary\n  }\n  inapp {\n    borderRadius\n    disableMessageIcon\n    disableCourierFooter\n    placement\n    widgetBackground {\n      topColor\n      bottomColor\n    }\n    colors {\n      invertHeader\n      invertButtons\n    }\n    icons {\n      bell\n      message\n    }\n    toast {\n      timerAutoClose\n      borderRadius\n    }\n  }\n}\npreferenceTemplates {\n  nodes {\n    defaultStatus\n    templateName\n    templateId\n  }\n}\n";
var GET_BRAND = "\nquery GetBrand($brandId: String!) {\n  brand(brandId: $brandId) {\n    ".concat(brandProps, "\n  }\n}\n");
var GET_DEFAULT_BRAND = "\nquery GetDefaultBrand {\n  defaultBrand {\n    ".concat(brandProps, "\n  }\n}\n");

var getBrand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(client, brandId) {
    var _results$data, _brand$settings, _brand$settings2, _brand$preferenceTemp;

    var results, brandProp, brand, colors, inapp, preferenceTemplates;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!brandId) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return client.query(GET_BRAND, {
              brandId: brandId
            });

          case 3:
            _context.t0 = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.next = 8;
            return client.query(GET_DEFAULT_BRAND);

          case 8:
            _context.t0 = _context.sent;

          case 9:
            results = _context.t0;
            brandProp = brandId ? "brand" : "defaultBrand";
            brand = results === null || results === void 0 ? void 0 : (_results$data = results.data) === null || _results$data === void 0 ? void 0 : _results$data[brandProp];
            colors = brand === null || brand === void 0 ? void 0 : (_brand$settings = brand.settings) === null || _brand$settings === void 0 ? void 0 : _brand$settings.colors;
            inapp = brand === null || brand === void 0 ? void 0 : (_brand$settings2 = brand.settings) === null || _brand$settings2 === void 0 ? void 0 : _brand$settings2.inapp;
            preferenceTemplates = brand === null || brand === void 0 ? void 0 : (_brand$preferenceTemp = brand.preferenceTemplates) === null || _brand$preferenceTemp === void 0 ? void 0 : _brand$preferenceTemp.nodes;
            return _context.abrupt("return", {
              colors: colors,
              inapp: inapp,
              preferenceTemplates: preferenceTemplates
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getBrand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getBrand = getBrand;