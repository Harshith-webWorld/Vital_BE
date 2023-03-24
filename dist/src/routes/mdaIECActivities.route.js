"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _mdaIECActivities = _interopRequireDefault(require("../controllers/mdaIECActivities.controller"));

var _mdalECActivitiesBulk = _interopRequireDefault(require("../controllers/mdalECActivitiesBulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _mdaIECActivities["default"].create).post("/bulkcreate", _mdaIECActivities["default"].bulkCreate).get("/list", _mdaIECActivities["default"].getMdaIECActivities).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mdaIECActivities["default"].getMdaIECActivities).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mdaIECActivities["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _mdaIECActivities["default"].deleteMdaIECActivities).post("/bulkCreate", _mdalECActivitiesBulk["default"].bulkCreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=mdaIECActivities.route.js.map
