"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _websitecontent = _interopRequireDefault(require("../controllers/websitecontent.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _websitecontent["default"].create).get("/list", _websitecontent["default"].getWebsiteContent).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].WEBSITEID_REQUIRED)], _websitecontent["default"].create);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent.route.js.map
