"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _village = _interopRequireDefault(require("../controllers/village.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/create", _village["default"].create).get("/list", _village["default"].getVillage).get("/get", [(0, _expressValidator.query)("districtId").exists(), (0, _expressValidator.query)("facilityId").exists()], _village["default"].getVillage).get("/getByTalukaId", [(0, _expressValidator.query)("districtId").exists(), (0, _expressValidator.query)("talukaId").exists()], _village["default"].getVillage).get('/getbydistrict', _village["default"].getVillagebyDistrict).get("/getBySubCenterId", [(0, _expressValidator.query)("districtId").exists(), (0, _expressValidator.query)("facilityId").exists(), (0, _expressValidator.query)("subCenterId").exists()], _village["default"].getVillageBySubCenter).put("/update", [(0, _expressValidator.check)("id").exists().withMessage(_resources["default"].VILLAGEID_REQUIRED)], _village["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage(_resources["default"].VILLAGEID_REQUIRED)], _village["default"].deleteVillage);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=village.route.js.map
