"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _institutionTypes = _interopRequireDefault(require("../controllers/institutionTypes.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _institutionTypes["default"].create).get("/list", _institutionTypes["default"].getInstitutionTypes).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _institutionTypes["default"].getInstitutionTypes);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=institutionTypes.route.js.map
