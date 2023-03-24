"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _user["default"].create).get("/list", _user["default"].getusers).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].USERID_REQUIRED)], _user["default"].getusers).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].USERID_REQUIRED)], _user["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].USERID_REQUIRED)], _user["default"].deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.route.js.map
