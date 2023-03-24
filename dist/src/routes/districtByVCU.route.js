"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _districtByVCU = _interopRequireDefault(require("../controllers/districtByVCU.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.get("/getOne", [(0, _expressValidator.check)("unitId").exists().withMessage(_resources["default"].UNITID_REQUIRED)], _districtByVCU["default"].getDistrictByVCU);
router.get("/fsu", [(0, _expressValidator.check)("unitId").exists().withMessage(_resources["default"].UNITID_REQUIRED)], _districtByVCU["default"].getDistrictByFSU);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=districtByVCU.route.js.map
