"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _trackEvent = require("../actions/track-event");

var useCourierActions = function useCourierActions(dispatch) {
  return {
    initToast: function initToast(payload) {
      dispatch({
        type: "INIT_TOAST",
        payload: payload
      });
    },
    initInbox: function initInbox(payload) {
      dispatch({
        type: "INIT_INBOX",
        payload: payload
      });
    },
    createTrackEvent: function createTrackEvent(trackingId) {
      dispatch({
        type: "CREATE_TRACKING_EVENT",
        payload: function payload(_, getState) {
          return (0, _trackEvent.updateTrackEvent)(getState().graphQLClient, trackingId);
        }
      });
    },
    createBatchTrackEvent: function createBatchTrackEvent(eventType) {
      dispatch({
        type: "CREATE_TRACKING_EVENT_BATCH",
        payload: function payload(_, getState) {
          return (0, _trackEvent.updateTrackEventBatch)(getState().graphQLClient, eventType);
        }
      });
    }
  };
};

var _default = useCourierActions;
exports["default"] = _default;