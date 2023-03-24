"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _corporation = _interopRequireDefault(require("../controllers/corporation.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _corporation["default"].create).get("/list", _corporation["default"].getCorporation).get("/get", [(0, _expressValidator.query)("districtId").exists().withMessage(_resources["default"].CORPORATIONID_REQUIRED)], _corporation["default"].getCorporation).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].CORPORATIONID_REQUIRED)], _corporation["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].CORPORATIONID_REQUIRED)], _corporation["default"].deleteCorporation);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=corporation.route.js.map
