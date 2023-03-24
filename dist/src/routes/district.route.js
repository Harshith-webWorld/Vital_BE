"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _district = _interopRequireDefault(require("../controllers/district.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _district["default"].create).get("/list", _district["default"].getDistrict).get("/get", [(0, _expressValidator.check)("stateId").exists().withMessage(_resources["default"].DISTRICTID_REQUIRED)], _district["default"].getDistrict).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].DISTRICTID_REQUIRED)], _district["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].DISTRICTID_REQUIRED)], _district["default"].deleteDistrict);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=district.route.js.map
