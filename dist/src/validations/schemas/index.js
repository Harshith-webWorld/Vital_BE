"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.querySchema = exports.bodySchema = void 0;

var hydrocelectomyOperations = _interopRequireWildcard(require("./hydrocelectomyOperations.validations"));

var hydrocelectomyOperationsReports = _interopRequireWildcard(require("./hydrocelectomyOperationsReports.validations"));

var mmdpKitsReports = _interopRequireWildcard(require("./mmdpKitsReports.validations"));

var FSUZoneReports = _interopRequireWildcard(require("./FSUZoneReports.validations"));

var FCUMisMtrReports = _interopRequireWildcard(require("./FCUMisMtrReports.validations"));

var NCMisMtrReports = _interopRequireWildcard(require("./NCMisMtrReports.validations"));

var RCOMisMtrReports = _interopRequireWildcard(require("./RCOMisMtrReports.validations"));

var YearwiseMisMtrReports = _interopRequireWildcard(require("./YearwiseMisMtrReports.validations"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var bodySchema = {
  "/hydrocelectomyOperations/create": hydrocelectomyOperations.createValidation,
  "/hydrocelectomyOperations/bulkCreate": hydrocelectomyOperations.bulkCreateValidation,
  "/hydrocelectomyOperations/update": hydrocelectomyOperations.updateValidation,
  "/hydrocelectomyOperationsReport/getHydroceleOperationsReport": hydrocelectomyOperationsReports.postValidation,
  "/mmdpKitsReport/getMMDPKitsReport": mmdpKitsReports.postValidation,
  "/fsuZoneReport/getFSUZoneReport": FSUZoneReports.postValidation,
  "/fcuMisMtrReport/getFCUMisMtrReport": FCUMisMtrReports.postValidation,
  "/ncMisMtrReport/getNCMisMtrReport": NCMisMtrReports.postValidation,
  "/rcoMisMtrReport/getRCOMisMtrReport": RCOMisMtrReports.postValidation,
  "/yearwiseMisMtrReport/getYearwiseMisMtrReport": YearwiseMisMtrReports.postValidation
};
exports.bodySchema = bodySchema;
var querySchema = {
  "/hydrocelectomyOperations/getone": hydrocelectomyOperations.getOneValidation,
  "/hydrocelectomyOperations/delete": hydrocelectomyOperations.deleteValidation
};
exports.querySchema = querySchema;
//# sourceMappingURL=index.js.map
