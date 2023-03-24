"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _mfPositiveLineList = _interopRequireDefault(require("../controllers/mfPositiveLineList.controller"));

var _mfPositiveLineListbulk = _interopRequireDefault(require("../controllers/mfPositiveLineListbulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/createMfPositiveLineList", _mfPositiveLineList["default"].createMfPositiveLineList).post("/createAllMfPositiveLineList", _mfPositiveLineList["default"].createAllMfPositiveLineList).get("/listMfPositiveLineList", _mfPositiveLineList["default"].getMFPositiveLineList).get("/listMfPositiveLineList/:id", _mfPositiveLineList["default"].getMFPositiveLineList).put("/updateMfPositiveLineList/:id", _mfPositiveLineList["default"].createMfPositiveLineList)["delete"]("/deleteMfPositiveLineList", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ID_REQUIRED)], _mfPositiveLineList["default"].deleteMFPositiveLineList).post("/createMfPositiveLineListSurvey/:fieldUnitId", _mfPositiveLineList["default"].createMfPositiveLineListSurvey).get("/listMfPositiveLineListSurvey", _mfPositiveLineList["default"].getMfPositiveLineListSurvey).get("/listMfPositiveLineListSurvey/:fieldUnitId", _mfPositiveLineList["default"].getMfPositiveLineListSurvey).put("/updateMfPositiveLineListSurvey/:fieldUnitId", _mfPositiveLineList["default"].createMfPositiveLineListSurvey)["delete"]("/deleteMfPositiveLineListSurvey", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ID_REQUIRED)], _mfPositiveLineList["default"].deleteMfPositiveLineListSurvey).post("/createMfPositiveLineListPatients", _mfPositiveLineList["default"].createMfPositiveLineListPatients).get("/getAlllistMfPositiveLineListPatients/:fieldUnitId", _mfPositiveLineList["default"].getMfPositiveLineListPatients).get("/listMfPositiveLineListPatients/:id", _mfPositiveLineList["default"].getMfPositiveLineListPatients).put("/updateMfPositiveLineListPatients/:id", _mfPositiveLineList["default"].createMfPositiveLineListPatients)["delete"]("/deleteMfPositiveLineListPatients", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ID_REQUIRED)], _mfPositiveLineList["default"].deleteMfPositiveLineListPatients).post("/createMfPositiveLineListBSFollowUps", _mfPositiveLineList["default"].createMfPositiveLineListBSFollowUps).get("/getAlllistMfPositiveLineListBSFollowUps/:fieldUnitId", _mfPositiveLineList["default"].getMfPositiveLineListBSFollowUps).get("/listMfPositiveLineListBSFollowUps/:id", _mfPositiveLineList["default"].getMfPositiveLineListBSFollowUps).put("/updateMfPositiveLineListBSFollowUps/:id", _mfPositiveLineList["default"].createMfPositiveLineListBSFollowUps)["delete"]("/deleteMfPositiveLineListBSFollowUps", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ID_REQUIRED)], _mfPositiveLineList["default"].deleteMfPositiveLineListBSFollowUps).post("/bulkcreateMfPositiveLineList", _mfPositiveLineListbulk["default"].bulkcreateMfPositiveLineList).post("/bulkcreateMfPositiveLineListSurvey", _mfPositiveLineListbulk["default"].bulkcreateMfPositiveLineListSurvey).post("/bulkcreateMfPositiveLineListPatients", _mfPositiveLineListbulk["default"].bulkcreateMfPositiveLineListPatients).post("/bulkcreateMfPositiveLineListBSFollowUps", _mfPositiveLineListbulk["default"].bulkcreateMfPositiveLineListBSFollowUps);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=mfPositiveLineList.route.js.map
