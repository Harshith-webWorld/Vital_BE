"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _mapContoller = _interopRequireDefault(require("../controllers/mapContoller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/GetEndemicityMapAllDistricts", _mapContoller["default"].GetEndemicityMapAllDistricts).post("/GetEndemicityMapAllTaluksByDistrict", _mapContoller["default"].GetEndemicityMapAllTaluksByDistrict).post("/GetEndemicityMapAllVillagesByTaluka", _mapContoller["default"].GetEndemicityMapAllVillagesByTaluka).get("/GetDistrictsGeo", _mapContoller["default"].GetDistrictsGeo).get("/GetTalukasGeo", _mapContoller["default"].GetTalukasGeo).get("/GetVillagesGeo", _mapContoller["default"].GetVillagesGeo).get("/GetTownsGeo", _mapContoller["default"].GetTownsGeo).get("/GetEndemicityMapHome", _mapContoller["default"].GetEndemicityMapHome);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=mapRoutes.js.map
