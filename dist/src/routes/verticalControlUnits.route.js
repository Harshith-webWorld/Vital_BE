"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _verticalControlUnits = _interopRequireDefault(require("../controllers/verticalControlUnits.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.get("/listVerticalControlUnits", _verticalControlUnits["default"].getverticalControlUnits).post("/createverticalControlUnits", _verticalControlUnits["default"].createverticalControlUnits).get("/createverticalControlFieldUnits", _verticalControlUnits["default"].createverticalControlFieldUnits).get("/getoneVerticalControlUnits", [(0, _expressValidator.query)("id").exists(), (0, _expressValidator.query)("unitType").exists()], _verticalControlUnits["default"].getverticalControlUnits).get("/listVerticalControlFieldUnits", _verticalControlUnits["default"].getverticalControlFieldUnits).get("/getoneVerticalControlFieldUnits", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _verticalControlUnits["default"].getverticalControlFieldUnits).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _verticalControlUnits["default"].createverticalControlUnits);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=verticalControlUnits.route.js.map
