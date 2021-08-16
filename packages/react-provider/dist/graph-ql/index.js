"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GraphQLClient = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _urql = require("urql");

var GraphQLClient = /*#__PURE__*/function () {
  function GraphQLClient(_ref) {
    var _ref2;

    var clientKey = _ref.clientKey,
        userId = _ref.userId,
        userSignature = _ref.userSignature,
        apiUrl = _ref.apiUrl;
    (0, _classCallCheck2["default"])(this, GraphQLClient);

    if (!clientKey || !userId) {
      return;
    }

    this.client = (0, _urql.createClient)({
      url: "".concat((_ref2 = apiUrl !== null && apiUrl !== void 0 ? apiUrl : process.env.API_URL) !== null && _ref2 !== void 0 ? _ref2 : "https://api.courier.com", "/client/q"),
      requestPolicy: "network-only",
      fetchOptions: function fetchOptions() {
        var headers = {
          "x-courier-client-key": clientKey,
          "x-courier-user-id": userId
        };

        if (userSignature) {
          headers["x-courier-user-signature"] = userSignature;
        }

        return {
          headers: headers
        };
      }
    });
  }

  (0, _createClass2["default"])(GraphQLClient, [{
    key: "query",
    value: function query(queryString, variables) {
      if (!this.client) {
        return;
      }

      return this.client.query(queryString, variables).toPromise();
    }
  }, {
    key: "mutate",
    value: function mutate(mutateString, variables) {
      if (!this.client) {
        return;
      }

      return this.client.mutation(mutateString, variables).toPromise();
    }
  }]);
  return GraphQLClient;
}();

exports.GraphQLClient = GraphQLClient;
var _default = GraphQLClient;
exports["default"] = _default;