"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _FCUReportController = _interopRequireDefault(require("../controllers/FCUReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_FCUAnalysis1", _FCUReportController["default"].get_FCUAnalysis1List).post("/get_FCUAnalysis2", _FCUReportController["default"].get_FCUAnalysis2List).post("/get_FCUAnalysis4", _FCUReportController["default"].get_FCUAnalysis4List).post("/get_FCUAnalysis5", _FCUReportController["default"].get_FCUAnalysis5List).post("/get_FCUAnalysis6", _FCUReportController["default"].get_FCUAnalysis6List).post("/get_FCUAnalysis10", _FCUReportController["default"].get_FCUAnalysis10List).post("/get_FCUAnalysis7", _FCUReportController["default"].get_FCUAnalysis7List).post("/get_FCUAnalysis8", _FCUReportController["default"].get_FCUAnalysis8List);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=FCUReportRoutes.js.map
