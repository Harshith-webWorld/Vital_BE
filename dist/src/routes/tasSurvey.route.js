"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _tasSurvey = _interopRequireDefault(require("../controllers/tasSurvey.controller"));

var _tasSurveyBulk = _interopRequireDefault(require("../controllers/tasSurveyBulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/createAllTasSurvey", _tasSurvey["default"].createAllTasSurvey).post("/create", _tasSurvey["default"].create).get("/list", _tasSurvey["default"].getSurvey).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _tasSurvey["default"].getSurvey).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _tasSurvey["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _tasSurvey["default"].deleteSurvey).post("/createTasSurveyChildrens", _tasSurvey["default"].createTasSurveyChildrens).get("/listTasSurveyChildrens", _tasSurvey["default"].getTasSurveyChildrens).get("/getoneTasSurveyChildrens", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED) || (0, _expressValidator.query)("tasSurveyId").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _tasSurvey["default"].getTasSurveyChildrens).put("/updateTasSurveyChildrens", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _tasSurvey["default"].createTasSurveyChildrens)["delete"]("/deleteTasSurveyChildrens", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _tasSurvey["default"].deleteTasSurveyChildrens).post("/bulkCreate", _tasSurveyBulk["default"].bulkCreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=tasSurvey.route.js.map
