"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _screens = _interopRequireDefault(require("../controllers/screens.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _screens["default"].create).get("/list", _screens["default"].getScreens).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _screens["default"].getScreens);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=screens.route.js.map
