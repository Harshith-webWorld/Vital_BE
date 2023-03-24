"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _mdaIDACoverage = _interopRequireDefault(require("../controllers/mdaIDACoverage.controller"));

var _mdaIDACoverageBulk = _interopRequireDefault(require("../controllers/mdaIDACoverageBulk.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/createAllMDACoverage", _mdaIDACoverage["default"].createAllMdaIDACoverages).post("/createMDACoverage", _mdaIDACoverage["default"].createMdaIDACoverages).put("/updateMDACoverage/:id", _mdaIDACoverage["default"].createMdaIDACoverages).get("/getOneMDACoverage/:id", _mdaIDACoverage["default"].getMdaIDACoverages).get("/getAllMdaIDACoverageList", _mdaIDACoverage["default"].getMdaIDACoverages)["delete"]("/getMDACoverage/:id", _mdaIDACoverage["default"].deleteMdaIDACoverages).post("/createMdaIDACoverageRegularList", _mdaIDACoverage["default"].createMdaIDACoverageRegularList).put("/updateMdaIDACoverageRegularList/:id", _mdaIDACoverage["default"].createMdaIDACoverageRegularList).get("/getOneMdaIDACoverageRegularList/:id", _mdaIDACoverage["default"].getMdaIDACoverageRegularLists)["delete"]("/deleteMdaIDACoverageRegularList/:id", _mdaIDACoverage["default"].deletemdaIDACoverageRegularList).get("/getAllMdaIDACoverageRegularLists/:id", _mdaIDACoverage["default"].getAllMdaIDACoverageRegularLists).post("/createMdaIDACoverageMopUpList", _mdaIDACoverage["default"].createMdaIDACoverageMopUpList).put("/updateMdaIDACoverageMopUpList/:id", _mdaIDACoverage["default"].createMdaIDACoverageMopUpList)["delete"]("/deleteMdaIDACoverageMopUpList/:id", _mdaIDACoverage["default"].deleteMdaIDACoverageMopUpList).get("/getOneMdaIDACoverageMopUpList/:id", _mdaIDACoverage["default"].getMdaIDACoverageMopUpLists).get("/getAllMdaIDACoverageMopUpLists/:id", _mdaIDACoverage["default"].getAllMdaIDACoverageMopUpLists) //offline Route
.post("/bulkCreateMDACoverage", _mdaIDACoverageBulk["default"].bulkCreateMdaIDACoverages).post("/bulkCreateMdaIDACoverageRegularList", _mdaIDACoverageBulk["default"].bulkCreateMdaIDACoverageRegularList).post("/bulkCreateMdaIDACoverageMopUpList", _mdaIDACoverageBulk["default"].bulkCreateMdaIDACoverageMopUpList);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=mdaIDACoverage.route.js.map
