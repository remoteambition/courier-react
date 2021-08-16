"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  registerReducer: true,
  CourierContext: true,
  CourierProvider: true
};
exports.CourierProvider = exports.CourierContext = exports.registerReducer = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireWildcard(require("react"));

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

var _createReducer = _interopRequireDefault(require("react-use/lib/factory/createReducer"));

var _graphQl = _interopRequireDefault(require("./graph-ql"));

var _courier = require("./transports/courier");

var _reducer = _interopRequireWildcard(require("./reducer"));

var _middleware2 = _interopRequireDefault(require("./middleware"));

var _brand2 = require("./actions/brand");

var _useCourierActions = _interopRequireDefault(require("./hooks/use-courier-actions"));

var _transports = require("./transports");

Object.keys(_transports).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _transports[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transports[key];
    }
  });
});

var _hooks = require("./hooks");

Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hooks[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var registerReducer = _reducer.registerReducer;
exports.registerReducer = registerReducer;

var CourierContext = /*#__PURE__*/_react["default"].createContext(undefined);

exports.CourierContext = CourierContext;

var CourierProvider = function CourierProvider(_ref) {
  var apiUrl = _ref.apiUrl,
      brand = _ref.brand,
      brandId = _ref.brandId,
      children = _ref.children,
      clientKey = _ref.clientKey,
      _ref$middleware = _ref.middleware,
      _middleware = _ref$middleware === void 0 ? [] : _ref$middleware,
      onMessage = _ref.onMessage,
      _transport = _ref.transport,
      userId = _ref.userId,
      userSignature = _ref.userSignature,
      wsUrl = _ref.wsUrl;

  var middleware = [].concat((0, _toConsumableArray2["default"])(_middleware), (0, _toConsumableArray2["default"])(_middleware2["default"]));
  var useReducer = (0, _react.useCallback)(_createReducer["default"].apply(void 0, (0, _toConsumableArray2["default"])(middleware)), [_middleware]);
  var graphQLClient = (0, _react.useMemo)(function () {
    return new _graphQl["default"]({
      clientKey: clientKey,
      userId: userId,
      userSignature: userSignature,
      apiUrl: apiUrl
    });
  }, [clientKey, userId, userSignature, apiUrl]);
  var transport = (0, _react.useMemo)(function () {
    if (_transport) {
      return _transport;
    }

    if (clientKey && !_transport) {
      return new _courier.CourierTransport({
        clientKey: clientKey,
        wsUrl: wsUrl
      });
    }
  }, [_transport, clientKey, wsUrl]);

  var _useReducer = useReducer(_reducer["default"], {
    apiUrl: apiUrl,
    brand: brand,
    brandId: brandId,
    graphQLClient: graphQLClient,
    clientKey: clientKey,
    transport: transport,
    userId: userId,
    userSignature: userSignature,
    middleware: middleware
  }),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    if (_transport) {
      // this means the transport was passed in and we shouldn't subscribe
      return;
    }

    if (!transport || !userId) {
      return;
    }

    var courierTransport = transport;
    courierTransport.subscribe(userId);

    if (onMessage) {
      courierTransport.intercept(onMessage);
    }

    return function () {
      courierTransport.unsubscribe(userId);
    };
  }, [transport, userId]);
  (0, _react.useEffect)(function () {
    if (!clientKey || !userId) {
      return;
    }

    dispatch({
      type: "root/INIT",
      payload: {
        apiUrl: apiUrl,
        brandId: brandId,
        graphQLClient: graphQLClient,
        clientKey: clientKey,
        transport: transport,
        userId: userId,
        userSignature: userSignature
      }
    });
  }, [apiUrl, graphQLClient, clientKey, transport, userId, userSignature, brandId]);
  (0, _react.useEffect)(function () {
    if (brand) {
      // if we pass in brand, don't fetch it
      return;
    }

    if (!graphQLClient.client) {
      return;
    }

    dispatch({
      type: "root/GET_BRAND",
      payload: function payload() {
        return (0, _brand2.getBrand)(graphQLClient, brandId);
      }
    });
  }, [graphQLClient, brand, brandId]);
  (0, _react.useEffect)(function () {
    if (!state.brand || !clientKey || !userId) {
      return;
    }

    _asyncStorage["default"].setItem("".concat(clientKey, "/").concat(userId, "/provider"), JSON.stringify({
      brand: state.brand
    }));
  }, [state.brand, clientKey, userId]);
  (0, _react.useEffect)(function () {
    if (!clientKey || !userId) {
      return;
    }

    _asyncStorage["default"].getItem("".concat(clientKey, "/").concat(userId, "/provider")).then(function (localStorageState) {
      if (localStorageState) {
        try {
          var _JSON$parse = JSON.parse(localStorageState),
              _brand = _JSON$parse.brand;

          dispatch({
            type: "root/GET_BRAND/DONE",
            payload: _brand
          });
        } catch (ex) {
          console.log("error", ex);
        }
      }
    });
  }, [clientKey, userId]);
  var actions = (0, _useCourierActions["default"])(dispatch);
  return /*#__PURE__*/_react["default"].createElement(CourierContext.Provider, {
    value: _objectSpread(_objectSpread(_objectSpread({}, state), actions), {}, {
      dispatch: dispatch
    })
  }, children);
};

exports.CourierProvider = CourierProvider;