"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrackEventBatch = exports.updateTrackEvent = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var UPDATE_TRACK_EVENT = "\n  mutation TrackEvent($trackingId: String!) {\n    trackEvent(trackingId: $trackingId) {\n      id\n    }\n  }\n";
var UPDATE_TRACK_EVENT_BATCH = "\n  mutation BatchTrackEvent($eventType: String!) {\n    batchTrackEvent(eventType: $eventType) {\n      ids\n    }\n  }\n";

var updateTrackEvent = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(client, trackingId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.mutate(UPDATE_TRACK_EVENT, {
              trackingId: trackingId
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateTrackEvent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateTrackEvent = updateTrackEvent;

var updateTrackEventBatch = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(client, eventType) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.mutate(UPDATE_TRACK_EVENT_BATCH, {
              eventType: eventType
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateTrackEventBatch(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateTrackEventBatch = updateTrackEventBatch;