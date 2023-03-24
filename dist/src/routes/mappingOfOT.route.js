"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _mappingOfOT = _interopRequireDefault(require("../controllers/mappingOfOT.controller"));

var _mappingofOTbulk = _interopRequireDefault(require("../controllers/mappingofOTbulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _mappingOfOT["default"].create).get("/list", _mappingOfOT["default"].getmappingOfOT).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mappingOfOT["default"].getmappingOfOT).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mappingOfOT["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mappingOfOT["default"].deletemappingOfOT)["delete"]("/deletesurgeon", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mappingOfOT["default"].deletemappingOfOTSurg).post("/bulkCreate", _mappingofOTbulk["default"].bulkCreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=mappingOfOT.route.js.map
