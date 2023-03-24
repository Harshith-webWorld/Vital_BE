"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _taluka = _interopRequireDefault(require("../controllers/taluka.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _taluka["default"].create).get("/list", _taluka["default"].getTaluka).get("/get", [(0, _expressValidator.query)("districtId").exists().withMessage(_resources["default"].TALUKAID_REQUIRED)], _taluka["default"].getTaluka).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].TALUKAID_REQUIRED)], _taluka["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].TALUKAID_REQUIRED)], _taluka["default"].deleteTaluka);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=taluka.route.js.map
