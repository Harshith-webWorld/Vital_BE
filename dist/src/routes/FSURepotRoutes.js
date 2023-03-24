"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _FSURepotController = _interopRequireDefault(require("../controllers/FSURepotController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_FSUAnalysis1", _FSURepotController["default"].get_FSUAnalysis1List).post("/get_FSUAnalysis2", _FSURepotController["default"].get_FSUAnalysis2List).post("/get_FSUAnalysis3", _FSURepotController["default"].get_FSUAnalysis3List).post("/get_FSUAnalysis4", _FSURepotController["default"].get_FSUAnalysis4List).post("/get_FSUAnalysis5", _FSURepotController["default"].get_FSUAnalysis5List).post("/FSUPercentageTargetCompleted", _FSURepotController["default"].fsuPercentageTargetCompleted);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=FSURepotRoutes.js.map
