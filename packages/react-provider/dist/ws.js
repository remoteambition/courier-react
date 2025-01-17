"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WS = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _reconnectingWebsocket = _interopRequireDefault(require("reconnecting-websocket"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var WS = /*#__PURE__*/function () {
  function WS(_ref) {
    var url = _ref.url,
        clientKey = _ref.clientKey;
    (0, _classCallCheck2["default"])(this, WS);
    this.messageCallback = null;
    this.connection = undefined;
    this.connected = false;
    this.url = url;
    this.clientKey = clientKey;
    this.subscriptions = [];
  }

  (0, _createClass2["default"])(WS, [{
    key: "connect",
    value: function connect() {
      this.connection = new _reconnectingWebsocket["default"]("".concat(this.url, "/?clientKey=").concat(this.clientKey));
      this.connection.onopen = this.onOpen.bind(this);
      this.connection.onclose = this.onClose.bind(this);
      this.connection.onmessage = this.onMessage.bind(this);
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.connected = false;
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      this.connected = true;

      var _iterator = _createForOfIteratorHelper(this.subscriptions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var sub = _step.value;
          this.send({
            action: "subscribe",
            data: {
              channel: sub.channel,
              event: sub.event,
              clientKey: this.clientKey
            }
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "onMessage",
    value: function onMessage(_ref2) {
      var data = _ref2.data;
      var message;

      try {
        message = JSON.parse(data);
      } catch (_unused) {
        console.error("Error Parsing Courier Message");
        return;
      }

      var _iterator2 = _createForOfIteratorHelper(this.subscriptions),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _message;

          var sub = _step2.value;

          if (sub.event !== "*" && sub.event !== ((_message = message) === null || _message === void 0 ? void 0 : _message.event)) {
            continue;
          }

          sub.callback({
            data: message
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(channel, event, callback) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.subscriptions.push({
                  channel: channel,
                  event: event,
                  callback: callback
                });

                if (this.connected) {
                  this.send({
                    action: "subscribe",
                    data: {
                      channel: channel,
                      event: event,
                      clientKey: this.clientKey
                    }
                  });
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function subscribe(_x, _x2, _x3) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: "send",
    value: function send(message) {
      if (!this.connected || !this.connection) {
        console.warn("WS Not Connected");
        return;
      }

      this.connection.send(JSON.stringify(message));
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(channel, event) {
      this.subscriptions = this.subscriptions.filter(function (sub) {
        return !(sub.channel === channel && sub.event === event);
      });
      this.send({
        action: "unsubscribe",
        data: {
          channel: channel,
          event: event,
          clientKey: this.clientKey
        }
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this$connection;

      (_this$connection = this.connection) === null || _this$connection === void 0 ? void 0 : _this$connection.close();
    }
  }]);
  return WS;
}();

exports.WS = WS;