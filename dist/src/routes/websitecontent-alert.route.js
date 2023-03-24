"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _websitecontentAlert = _interopRequireDefault(require("../controllers/websitecontent-alert.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _websitecontentAlert["default"].create).get("/list", _websitecontentAlert["default"].getAlert).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].ALERTID_REQUIRED)], _websitecontentAlert["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ALERTID_REQUIRED)], _websitecontentAlert["default"].deleteAlert);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-alert.route.js.map
