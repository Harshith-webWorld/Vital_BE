"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../../index"));

var _config = _interopRequireDefault(require("../../config/config"));

/* eslint-env jest */
var apiVersionPath = "/api/v".concat(_config["default"].apiVersion);
describe("## Auth APIs", function () {
  var testApp;
  beforeAll(function () {
    testApp = (0, _supertest["default"])(_index["default"]);
  });
  var validUserCredentials = {
    username: "react",
    password: "express"
  };
  var invalidUserCredentials = {
    username: "react",
    password: "IDontKnow"
  };
  var jwtToken;
  describe("# POST ".concat(apiVersionPath, "/auth/login"), function () {
    test("should return Authentication error", function (done) {
      testApp.post("".concat(apiVersionPath, "/auth/login")).send(invalidUserCredentials).expect(_httpStatus["default"].UNAUTHORIZED).then(function (res) {
        expect(res.body.message).toEqual("Authentication error");
        done();
      })["catch"](done);
    });
    test("should get valid JWT token", function (done) {
      testApp.post("".concat(apiVersionPath, "/auth/login")).send(validUserCredentials).expect(_httpStatus["default"].OK).then(function (res) {
        expect(res.body).toHaveProperty("token");

        _jsonwebtoken["default"].verify(res.body.token, _config["default"].jwtSecret, function (err, decoded) {
          expect(!err);
          expect(decoded.username).toEqual(validUserCredentials.username);
          jwtToken = "Bearer ".concat(res.body.token);
          done();
        });
      })["catch"](done);
    });
  });
  describe("# GET ".concat(apiVersionPath, "/auth/random-number"), function () {
    test("should fail to get random number because of missing Authorization", function (done) {
      testApp.get("".concat(apiVersionPath, "/auth/random-number")).expect(_httpStatus["default"].UNAUTHORIZED).then(function (res) {
        expect(res.body.message).toEqual("Unauthorized");
        done();
      })["catch"](done);
    });
    test("should fail to get random number because of wrong token", function (done) {
      testApp.get("".concat(apiVersionPath, "/auth/random-number")).set("Authorization", "Bearer inValidToken").expect(_httpStatus["default"].UNAUTHORIZED).then(function (res) {
        expect(res.body.message).toEqual("Unauthorized");
        done();
      })["catch"](done);
    });
    test("should get a random number", function (done) {
      testApp.get("".concat(apiVersionPath, "/auth/random-number")).set("Authorization", jwtToken).expect(_httpStatus["default"].OK).then(function (res) {
        expect(typeof res.body.num === "number");
        done();
      })["catch"](done);
    });
  });
});
//# sourceMappingURL=auth.test.js.map
