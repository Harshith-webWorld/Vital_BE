"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _ward = _interopRequireDefault(require("../controllers/ward.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _ward["default"].create).get("/list", _ward["default"].getWard).get("/get", [(0, _expressValidator.query)("districtId").exists(), (0, _expressValidator.query)("corporationId")], _ward["default"].getWard).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].WARDID_REQUIRED)], _ward["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].WARDID_REQUIRED)], _ward["default"].deleteWard);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=ward.route.js.map
