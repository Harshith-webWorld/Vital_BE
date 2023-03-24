"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _hydrocelectomyOperations = _interopRequireDefault(require("../controllers/hydrocelectomyOperations.controller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _SchemaValidator = _interopRequireDefault(require("../validations/SchemaValidator"));

var validateRequestBody = (0, _SchemaValidator["default"])("body");
var validateRequestQuery = (0, _SchemaValidator["default"])("query");

var router = _express["default"].Router();

router.post("/create", validateRequestBody, _hydrocelectomyOperations["default"].create).post("/bulkCreate", validateRequestBody, _hydrocelectomyOperations["default"].bulkCreate).get("/list", _hydrocelectomyOperations["default"].get).get("/getone", validateRequestQuery, // [query("id").exists().withMessage(label.MISSING_REQUIRED)],
_hydrocelectomyOperations["default"].get).put("/update", validateRequestBody, // [check("id").exists().withMessage(label.MISSING_REQUIRED)],
_hydrocelectomyOperations["default"].update)["delete"]("/delete", validateRequestQuery, // [query("id").exists().withMessage(label.MISSING_REQUIRED)],
_hydrocelectomyOperations["default"].deleteEntry);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=hydrocelectomyOperations.route.js.map
