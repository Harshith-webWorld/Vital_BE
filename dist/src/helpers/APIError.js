"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _httpStatus = _interopRequireDefault(require("http-status"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @augments Error
 */
var ExtendableError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(ExtendableError, _Error);

  var _super = _createSuper(ExtendableError);

  function ExtendableError(message, status, isPublic) {
    var _this;

    (0, _classCallCheck2["default"])(this, ExtendableError);
    _this = _super.call(this, message);
    _this.name = _this.constructor.name;
    _this.message = message;
    _this.status = status;
    _this.isPublic = isPublic;
    _this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.

    Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), _this.constructor.name);
    return _this;
  }

  return ExtendableError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
/**
 * Class representing an API error.
 * @augments ExtendableError
 */


var APIError = /*#__PURE__*/function (_ExtendableError) {
  (0, _inherits2["default"])(APIError, _ExtendableError);

  var _super2 = _createSuper(APIError);

  /**
   * Creates an API error.
   * @param {string} message Error message.
   * @param {number} status HTTP status code of error.
   * @param {boolean} isPublic Whether the message should be visible to user or not.
   */
  function APIError(message) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _httpStatus["default"].INTERNAL_SERVER_ERROR;
    var isPublic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0, _classCallCheck2["default"])(this, APIError);
    return _super2.call(this, message, status, isPublic);
  }

  return APIError;
}(ExtendableError);

var _default = APIError;
exports["default"] = _default;
//# sourceMappingURL=APIError.js.map
