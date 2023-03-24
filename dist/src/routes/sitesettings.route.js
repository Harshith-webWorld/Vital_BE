"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _siteSettings = _interopRequireDefault(require("../controllers/siteSettings.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _siteSettings["default"].create).get("/list", _siteSettings["default"].getsiteSettings).get("/getOne/:id", _siteSettings["default"].getsiteSettings).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].SETTINGS_REQUIRED)], _siteSettings["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].SETTINGS_REQUIRED)], _siteSettings["default"].deletesiteSettings);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=sitesettings.route.js.map
