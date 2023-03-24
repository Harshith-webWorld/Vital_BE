"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _entomologicalLarvicidalList = _interopRequireDefault(require("../controllers/entomologicalLarvicidalList.controller"));

var _entomologicalLarvicidalListBulk = _interopRequireDefault(require("../controllers/entomologicalLarvicidalListBulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _entomologicalLarvicidalList["default"].create).get("/list", _entomologicalLarvicidalList["default"].getEntomologicalLarvicidalList).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].MISSING_REQUIRED)], _entomologicalLarvicidalList["default"].getEntomologicalLarvicidalList).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].DISTRICTID_REQUIRED)], _entomologicalLarvicidalList["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].DISTRICTID_REQUIRED)], _entomologicalLarvicidalList["default"].deletEntomologicalLarvicidalList)["delete"]("/deleteCounts", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].DISTRICTID_REQUIRED)], _entomologicalLarvicidalList["default"].deletEntomologicalDataCounts).post("/bulkCreate", _entomologicalLarvicidalListBulk["default"].bulkCreate);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=entomologicalLarvicidalList.route.js.map
