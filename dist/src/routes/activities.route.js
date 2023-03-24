"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _activities = _interopRequireDefault(require("../controllers/activities.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _activities["default"].create).get("/list", _activities["default"].getActivities).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _activities["default"].getActivities);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=activities.route.js.map
