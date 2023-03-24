"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _index = _interopRequireDefault(require("../../index"));

var _config = _interopRequireDefault(require("../../config/config"));

/* eslint-env jest */
var apiVersionPath = "/api/v".concat(_config["default"].apiVersion);
describe("## User APIs", function () {
  var testApp;
  beforeAll(function () {
    testApp = (0, _supertest["default"])(_index["default"]);
  });
  var user = {
    username: "KK123"
  };
  describe("# POST ".concat(apiVersionPath, "/users"), function () {
    test("should create a new user", function (done) {
      testApp.post("".concat(apiVersionPath, "/users")).send(user).expect(_httpStatus["default"].OK).then(function (res) {
        expect(res.body.username).toEqual(user.username);
        user = res.body;
        done();
      })["catch"](done);
    });
  });
  describe("# GET ".concat(apiVersionPath, "/users/:userId"), function () {
    test("should get user details", function (done) {
      testApp.get("".concat(apiVersionPath, "/users/").concat(user.id)).expect(_httpStatus["default"].OK).then(function (res) {
        expect(res.body.username).toEqual(user.username);
        done();
      })["catch"](done);
    });
    test("should report error with message - Not found, when user does not exist", function (done) {
      testApp.get("".concat(apiVersionPath, "/users/12345")).expect(_httpStatus["default"].NOT_FOUND).then(function (res) {
        expect(res.body.message).toEqual("Not Found");
        done();
      })["catch"](done);
    });
  });
  describe("# PUT ".concat(apiVersionPath, "/users/:userId"), function () {
    test("should update user details", function (done) {
      user.username = "KK";
      testApp.put("".concat(apiVersionPath, "/users/").concat(user.id)).send(user).expect(_httpStatus["default"].OK).then(function (res) {
        expect(res.body.username).toEqual("KK");
        done();
      })["catch"](done);
    });
  });
  describe("# GET ".concat(apiVersionPath, "/users/"), function () {
    test("should get all users", function (done) {
      testApp.get("".concat(apiVersionPath, "/users")).expect(_httpStatus["default"].OK).then(function (res) {
        expect(Array.isArray(res.body));
        done();
      })["catch"](done);
    });
    test("should get all users (with limit and skip)", function (done) {
      testApp.get("".concat(apiVersionPath, "/users")).query({
        limit: 10,
        skip: 1
      }).expect(_httpStatus["default"].OK).then(function (res) {
        expect(Array.isArray(res.body));
        done();
      })["catch"](done);
    });
  });
  describe("# DELETE ".concat(apiVersionPath, "/users/"), function () {
    test("should delete user", function (done) {
      testApp["delete"]("".concat(apiVersionPath, "/users/").concat(user.id)).expect(_httpStatus["default"].OK).then(function (res) {
        expect(res.body).toEqual("KK");
        done();
      })["catch"](done);
    });
  });
});
//# sourceMappingURL=user.test.js.map
