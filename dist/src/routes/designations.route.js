"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _designations = _interopRequireDefault(require("../controllers/designations.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _designations["default"].create).get("/list", _designations["default"].getDesignations).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _designations["default"].getDesignations);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=designations.route.js.map
