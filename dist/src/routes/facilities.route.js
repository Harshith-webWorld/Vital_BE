"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _facilities = _interopRequireDefault(require("../controllers/facilities.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _facilities["default"].create).get("/list", _facilities["default"].getFacility).post("/list", _facilities["default"].getFacility).get("/get", [(0, _expressValidator.query)("districtId").exists().withMessage(_resources["default"].FACILITYID_REQUIRED)], _facilities["default"].getFacility).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].FACILITYID_REQUIRED)], _facilities["default"].getFacility).get("/filter", [(0, _expressValidator.query)("facilityType").exists().withMessage(_resources["default"].FACILITYID_REQUIRED)], _facilities["default"].getFacility).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].FACILITYID_REQUIRED)], _facilities["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].FACILITYID_REQUIRED)], _facilities["default"].deleteFacility);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=facilities.route.js.map
