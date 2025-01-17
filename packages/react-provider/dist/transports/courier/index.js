"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CourierTransport = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ws = require("../../ws");

var _base = require("../base");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CourierTransport = /*#__PURE__*/function (_Transport) {
  (0, _inherits2["default"])(CourierTransport, _Transport);

  var _super = _createSuper(CourierTransport);

  function CourierTransport(options) {
    var _ref, _options$wsUrl;

    var _this;

    (0, _classCallCheck2["default"])(this, CourierTransport);
    _this = _super.call(this);

    if (!options.clientKey) {
      throw new Error("Missing Client Key");
    }

    _this.clientKey = options.clientKey;
    _this.userSignature = options.userSignature;
    _this.ws = new _ws.WS({
      clientKey: options.clientKey,
      url: (_ref = (_options$wsUrl = options.wsUrl) !== null && _options$wsUrl !== void 0 ? _options$wsUrl : _constants.COURIER_WS_URL) !== null && _ref !== void 0 ? _ref : "wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production"
    });

    _this.ws.connect();

    return _this;
  }

  (0, _createClass2["default"])(CourierTransport, [{
    key: "send",
    value: function send(message) {
      this.ws.send(_objectSpread(_objectSpread({}, message), {}, {
        data: _objectSpread(_objectSpread({}, message.data), {}, {
          clientKey: this.clientKey
        })
      }));
    }
  }, {
    key: "subscribe",
    value: function subscribe(channel, event) {
      var _this2 = this;

      this.ws.subscribe(channel, event !== null && event !== void 0 ? event : "*", function (_ref2) {
        var data = _ref2.data;

        if (_this2.interceptor) {
          data = _this2.interceptor(data);
        }

        if (!data) {
          return;
        }

        _this2.emit({
          data: data
        });
      });
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(channel, event) {
      this.ws.unsubscribe(channel, event !== null && event !== void 0 ? event : "*");
    }
  }]);
  return CourierTransport;
}(_base.Transport);

exports.CourierTransport = CourierTransport;