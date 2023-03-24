"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _index = _interopRequireDefault(require("../../index"));

var _config = _interopRequireDefault(require("../../config/config"));

/* eslint-env jest */
var apiVersionPath = "/api/v".concat(_config["default"].apiVersion);
describe("## Misc", function () {
  var testApp;
  beforeAll(function () {
    testApp = (0, _supertest["default"])(_index["default"]);
  });
  describe("# GET ".concat(apiVersionPath, "/health-check"), function () {
    test("should return OK", function (done) {
      testApp.get("".concat(apiVersionPath, "/health-check")).expect(_httpStatus["default"].OK).then(function (res) {
        expect(res.text).toEqual("OK");
        done();
      })["catch"](done);
    });
  });
  describe("# GET ".concat(apiVersionPath, "/404"), function () {
    test("should return 404 status", function (done) {
      testApp.get("".concat(apiVersionPath, "/404")).expect(_httpStatus["default"].NOT_FOUND).then(function (res) {
        expect(res.body.message).toEqual("Not Found");
        done();
      })["catch"](done);
    });
  });
  describe("# Error Handling", function () {
    test("should handle express validation error - username is required", function (done) {
      testApp.post("".concat(apiVersionPath, "/users")).send({
        mobileNumber: "1234567890"
      }).expect(_httpStatus["default"].BAD_REQUEST).then(function (res) {
        expect(res.body.message).toEqual('"username" is required');
        done();
      })["catch"](done);
    });
  });
});
//# sourceMappingURL=misc.test.js.map
