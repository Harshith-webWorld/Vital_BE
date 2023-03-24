"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _userRoleScreenActivities = _interopRequireDefault(require("../controllers/userRoleScreenActivities.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _userRoleScreenActivities["default"].create).get("/list", _userRoleScreenActivities["default"].getUserRoleScreenActivities).get("/getone/:id", _userRoleScreenActivities["default"].getUserRoleScreenActivities).get("/getuser/:id", _userRoleScreenActivities["default"].getUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=userRoleScreenActivities.route.js.map
