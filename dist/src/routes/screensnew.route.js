"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _screensnew = _interopRequireDefault(require("../controllers/screensnew.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _screensnew["default"].create).get("/list", _screensnew["default"].getScreens).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _screensnew["default"].getScreens);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=screensnew.route.js.map
