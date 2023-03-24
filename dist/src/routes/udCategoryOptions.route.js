"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _udCategoryOptions = _interopRequireDefault(require("../controllers/udCategoryOptions.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.get("/list", _udCategoryOptions["default"].getUdCategoryOptions).get("/list", [(0, _expressValidator.query)("categoryCode").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _udCategoryOptions["default"].getUdCategoryOptions);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=udCategoryOptions.route.js.map
