"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _role = _interopRequireDefault(require("../controllers/role.controller"));

var _expressValidator = require("express-validator");

var _resources = _interopRequireDefault(require("../../config/resources"));

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

router.post("/create", _role["default"].create).get("/list", _role["default"].getRole).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].ROLEID_REQUIRED)], _role["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].ROLEID_REQUIRED)], _role["default"].deleteRole);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=role.route.js.map
