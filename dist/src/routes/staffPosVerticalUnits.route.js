"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _staffPosVerticalUnits = _interopRequireDefault(require("../controllers/staffPosVerticalUnits.controller"));

var _staffPosVerticalUnitsbulk = _interopRequireDefault(require("../controllers/staffPosVerticalUnitsbulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/createStaffPosVerticalUnits", _staffPosVerticalUnits["default"].createStaffPosVerticalUnits).post("/createAllStaffPosVerticalUnits", _staffPosVerticalUnits["default"].createAllStaffPosVerticalUnits).get("/listStaffPosVerticalUnits", _staffPosVerticalUnits["default"].getStaffPosVerticalUnits).get("/getoneStaffPosVerticalUnits", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].getStaffPosVerticalUnits).put("/updateStaffPosVerticalUnits", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].createStaffPosVerticalUnits)["delete"]("/deleteStaffPosVerticalUnits", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].deleteStaffPosVerticalUnits).post("/createStaffPosVerticalTraining", _staffPosVerticalUnits["default"].createStaffPosVerticalUnitStaffs).get("/listStaffPosVerticalTraining/:id", _staffPosVerticalUnits["default"].getStaffPosVerticalUnitStaffs).get("/listStaffPosVerticalTraining", _staffPosVerticalUnits["default"].getStaffPosVerticalUnitStaffs).get("/getoneStaffPosVerticalTraining", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].getStaffPosVerticalUnitStaffs).put("/updateStaffPosVerticalTraining", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].createStaffPosVerticalUnitStaffs)["delete"]("/deleteStaffPosVerticalTraining", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].deleteStaffPosVerticalUnitStaffs).post("/createStaffPosVerticalUnitTrainingStatus", _staffPosVerticalUnits["default"].createStaffPosVerticalUnitTrainingStatus).get("/listStaffPosVerticalUnitTrainingStatus", _staffPosVerticalUnits["default"].getAllStaffPosVerticalUnitTrainingStatus).get("/listStaffPosVerticalUnitTrainingStatus/:id", _staffPosVerticalUnits["default"].getStaffPosVerticalUnitTrainingStatus).get("/getoneStaffPosVerticalUnitTrainingStatus", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].getStaffPosVerticalUnitTrainingStatus).put("/updateStaffPosVerticalUnitTrainingStatus", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].createStaffPosVerticalUnitTrainingStatus)["delete"]("/deleteStaffPosVerticalUnitTrainingStatus", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _staffPosVerticalUnits["default"].deleteStaffPosVerticalUnitTrainingStatus) ///offline bulk createStaffPosVerticalUnitTrainingStatus
.post("/bulkCreateStaffPosition", _staffPosVerticalUnitsbulk["default"].bulkcreateStaffPosVerticalUnits).post("/bulkcreateStaffPosVerticalTraining", _staffPosVerticalUnitsbulk["default"].bulkcreateStaffPosVerticalUnitStaffs).post("/bulkcreateStaffPosVerticalUnitTrainingStatus", _staffPosVerticalUnitsbulk["default"].bulkcreateStaffPosVerticalUnitTrainingStatus);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=staffPosVerticalUnits.route.js.map
