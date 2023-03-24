"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _postMDAEvalList = _interopRequireDefault(require("../controllers/postMDAEvalList.controller"));

var _postMDAEvalListbulk = _interopRequireDefault(require("../controllers/postMDAEvalListbulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _postMDAEvalList["default"].create).get("/list", _postMDAEvalList["default"].getEvalList).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _postMDAEvalList["default"].getEvalList).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _postMDAEvalList["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _postMDAEvalList["default"].deleteEvalList)["delete"]("/deleteEvalListPersons", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _postMDAEvalList["default"].deletePostMDAEvalListPersons)["delete"]("/deleteEvalListFmembers", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _postMDAEvalList["default"].deletePostMDAEvalListFMembers) ///bulk create 
.post("/bulkcreate", _postMDAEvalListbulk["default"].bulkCreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=postMDAEvalList.route.js.map
