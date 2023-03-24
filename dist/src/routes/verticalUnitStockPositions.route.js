"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _verticalUnitStockPositions = _interopRequireDefault(require("../controllers/verticalUnitStockPositions.controller"));

var _verticalUnitStockPositionsbulk = _interopRequireDefault(require("../controllers/verticalUnitStockPositionsbulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _verticalUnitStockPositions["default"].create).post("/bulkcreate", _verticalUnitStockPositions["default"].bulkCreate).get("/list", _verticalUnitStockPositions["default"].getVerticalUnit).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _verticalUnitStockPositions["default"].getVerticalUnit).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _verticalUnitStockPositions["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _verticalUnitStockPositions["default"].deleteVerticalUnit).post("/bulkcreates", _verticalUnitStockPositionsbulk["default"].bulkCreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=verticalUnitStockPositions.route.js.map
