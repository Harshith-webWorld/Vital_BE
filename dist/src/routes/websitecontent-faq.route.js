"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _websitecontentFaq = _interopRequireDefault(require("../controllers/websitecontent-faq.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _websitecontentFaq["default"].create).get("/list", _websitecontentFaq["default"].getFaq).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].FAQID_REQUIRED)], _websitecontentFaq["default"].getFaq).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].FAQID_REQUIRED)], _websitecontentFaq["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].FAQID_REQUIRED)], _websitecontentFaq["default"].deleteFaq);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-faq.route.js.map
