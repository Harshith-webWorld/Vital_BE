"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _states = _interopRequireDefault(require("../controllers/states.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _states["default"].create).get("/list", _states["default"].getState).get("/getOne/:id", _states["default"].getState).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].STATEID_REQUIRED)], _states["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].STATEID_REQUIRED)], _states["default"].deleteState);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=state.route.js.map
