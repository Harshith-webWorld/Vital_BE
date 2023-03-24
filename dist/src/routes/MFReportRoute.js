"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _MFReportController = _interopRequireDefault(require("../controllers/MFReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_AdditionalMFSurveyReportList", _MFReportController["default"].get_AdditionalMFSurveyReportList).post("/get_MFBaseLineSurveyList", _MFReportController["default"].get_MFBaseLineSurveyList).post("/get_DiseaseRateVillagewise", _MFReportController["default"].DiseaseRate_Villagewise);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=MFReportRoute.js.map
