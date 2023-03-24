"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _fsuTargetAchievements = _interopRequireDefault(require("../controllers/fsuTargetAchievements.controller"));

var _fsuTargetAchievementsBulk = _interopRequireDefault(require("../controllers/fsuTargetAchievementsBulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/createFsuTargetAchivements", _fsuTargetAchievements["default"].createFsuTargetAchivements).get("/listFsuTargetAchivements", _fsuTargetAchievements["default"].getFsuTargetAchivements).get("/getoneFsuTargetAchivements", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _fsuTargetAchievements["default"].getFsuTargetAchivements).put("/updateFsuTargetAchivements", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _fsuTargetAchievements["default"].createFsuTargetAchivements)["delete"]("/deleteFsuTargetAchivements", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _fsuTargetAchievements["default"].deleteFsuTargetAchivements).post("/createFsuTargetAchievementsSurveys", _fsuTargetAchievements["default"].createFsuTargetAchievementsSurveys).get("/listFsuTargetAchievementsSurveys", _fsuTargetAchievements["default"].getFsuTargetAchievementsSurveys).get("/getoneFsuTargetAchievementsSurveys", [(0, _expressValidator.query)("fsuTargetAchievementId").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _fsuTargetAchievements["default"].getFsuTargetAchievementsSurveys).put("/updateFsuTargetAchievementsSurveys", [(0, _expressValidator.check)("fsuTargetAchievementId").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _fsuTargetAchievements["default"].createFsuTargetAchievementsSurveys)["delete"]("/deleteFsuTargetAchievementsSurveys", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _fsuTargetAchievements["default"].deletefsuTargetAchievementsSurveys).post("/bulkCreateFsuTargetAchivements", _fsuTargetAchievementsBulk["default"].bulkCreateFsuTargetAchivements).post("/bulkCreateFsuTargetAchievementsSurveys", _fsuTargetAchievementsBulk["default"].bulkCreateFsuTargetAchievementsSurveys);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=fsuTargetAchievements.route.js.map
