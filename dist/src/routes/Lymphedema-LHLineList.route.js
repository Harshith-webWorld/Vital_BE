"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _LymphedemaLHLineList = _interopRequireDefault(require("../controllers/Lymphedema-LHLineList.controller"));

var _LymphedemabulkLHLineLis = _interopRequireDefault(require("../controllers/Lymphedemabulk-LHLineLis.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _LymphedemaLHLineList["default"].create).get("/list", _LymphedemaLHLineList["default"].getLHLineList).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _LymphedemaLHLineList["default"].getLHLineList).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _LymphedemaLHLineList["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _LymphedemaLHLineList["default"].deleteLHLineList).post("/savePatientInformation", _LymphedemaLHLineList["default"].postPatientInformation).put("/updatePatientInformation/:id", _LymphedemaLHLineList["default"].postPatientInformation).get("/getPatientInfo/:id", _LymphedemaLHLineList["default"].getPatientInfo).post("/saveSurvey", _LymphedemaLHLineList["default"].postSurvey).get("/getSurveyList/:lymphedemaLineListId", _LymphedemaLHLineList["default"].getSurveyList).post("/saveLfFollowup", _LymphedemaLHLineList["default"].postLFFollowups).get("/getLFFollowups/:lymphedemaLineListId", _LymphedemaLHLineList["default"].getLFFollowups).post("/saveHFFollowup", _LymphedemaLHLineList["default"].postHFFollowups).get("/getHFFollowups/:lymphedemaLineListId", _LymphedemaLHLineList["default"].getHFFollowups)["delete"]("/deleteHFFollowup/:id", _LymphedemaLHLineList["default"].deleteHFFollowup)["delete"]("/deleteLFFollowup/:id", _LymphedemaLHLineList["default"].deleteLFFollowup)["delete"]("/deleteSurvey/:id", _LymphedemaLHLineList["default"].deleteSurvey).post("/bulkcreate", _LymphedemabulkLHLineLis["default"].bulkcreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=Lymphedema-LHLineList.route.js.map
