"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _zone = _interopRequireDefault(require("../controllers/zone.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _zone["default"].create).get("/list", _zone["default"].getZone).get("/get", [(0, _expressValidator.check)("districtId").exists().withMessage(_resources["default"].ZONEID_REQUIRED)], _zone["default"].getZone).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].ZONEID_REQUIRED)], _zone["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ZONEID_REQUIRED)], _zone["default"].deleteZone);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=zone.route.js.map
