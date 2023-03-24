"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _preMDAActivites = _interopRequireDefault(require("../controllers/preMDAActivites.controller"));

var _preMDAActivitiesBulk = _interopRequireDefault(require("../controllers/preMDAActivitiesBulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/createAllPreMDAActivities", _preMDAActivites["default"].createAllPreMDAActivity).post("/createPreMDAActivities", _preMDAActivites["default"].createPreMDAActivities).get("/listPreMDAActivities", _preMDAActivites["default"].getPreMDAActivities).get("/getonePreMDAActivities/:id", _preMDAActivites["default"].getPreMDAActivities).put("/updatePreMDAActivities", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _preMDAActivites["default"].createPreMDAActivities)["delete"]("/deletePreMDAActivityDrugAdministrators", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _preMDAActivites["default"].deletepreMDAActivityDrugAdministrators)["delete"]("/deletePreMDAActivitySupervisors", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _preMDAActivites["default"].deletepreMDAActivitySupervisors)["delete"]("/deletePreMDAActivities", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _preMDAActivites["default"].deletePreMDAActivities).post("/createPreMDAActivityDrugLogistics", _preMDAActivites["default"].createPreMDAActivityDrugLogistics).get("/listPreMDAActivityDrugLogistics/:preMDAActivityId", _preMDAActivites["default"].getAllPreMDAActivityDrugLogistics).get("/listPreMDAActivityDrugLogistics", _preMDAActivites["default"].getPreMDAActivityDrugLogistics).get("/getonePreMDAActivityDrugLogistics/:id", _preMDAActivites["default"].getPreMDAActivityDrugLogistics).put("/updatePreMDAActivityDrugLogistics", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _preMDAActivites["default"].createPreMDAActivityDrugLogistics)["delete"]("/deletePreMDAActivityDrugLogistics", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _preMDAActivites["default"].deletePreMDAActivityDrugLogistics).post("/bulkCreate", _preMDAActivitiesBulk["default"].bulkCreate); //.post("/bulkCreatePreMDAActivityDrugLogistics", bulkpreMDAActivitiesController.bulkCreatePreMDAActivityDrugLogistics)

var _default = router;
exports["default"] = _default;
//# sourceMappingURL=preMDAActivities.route.js.map
