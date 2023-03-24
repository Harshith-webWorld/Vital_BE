"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _auth2 = _interopRequireDefault(require("./auth.route"));

var _user = _interopRequireDefault(require("./user.route"));

var _role = _interopRequireDefault(require("./role.route"));

var _websitecontentNews = _interopRequireDefault(require("./websitecontent-news.route"));

var _websitecontentPrograminfos = _interopRequireDefault(require("./websitecontent-programinfos.route"));

var _websitecontentImages = _interopRequireDefault(require("./websitecontent-images.route"));

var _websitecontentOthers = _interopRequireDefault(require("./websitecontent-others.route"));

var _websitecontentVideos = _interopRequireDefault(require("./websitecontent-videos.route"));

var _websitecontent = _interopRequireDefault(require("./websitecontent.route"));

var _websitecontentAlert = _interopRequireDefault(require("./websitecontent-alert.route"));

var _websitecontentFaq = _interopRequireDefault(require("./websitecontent-faq.route"));

var _state = _interopRequireDefault(require("./state.route"));

var _district = _interopRequireDefault(require("./district.route"));

var _districtByVCU = _interopRequireDefault(require("./districtByVCU.route"));

var _taluka = _interopRequireDefault(require("./taluka.route"));

var _village = _interopRequireDefault(require("./village.route"));

var _corporation = _interopRequireDefault(require("./corporation.route"));

var _zone = _interopRequireDefault(require("./zone.route"));

var _ward = _interopRequireDefault(require("./ward.route"));

var _facilities = _interopRequireDefault(require("./facilities.route"));

var _subcenter = _interopRequireDefault(require("./subcenter.route"));

var _LymphedemaLHLineList = _interopRequireDefault(require("./Lymphedema-LHLineList.route"));

var _tasSurvey = _interopRequireDefault(require("./tasSurvey.route"));

var _postMDAEvalList = _interopRequireDefault(require("./postMDAEvalList.route"));

var _fsuTargetAchievements = _interopRequireDefault(require("./fsuTargetAchievements.route"));

var _mdaIECActivities = _interopRequireDefault(require("./mdaIECActivities.route"));

var _preMDAActivities = _interopRequireDefault(require("./preMDAActivities.route"));

var _verticalUnitStockPositions = _interopRequireDefault(require("./verticalUnitStockPositions.route"));

var _mappingOfOT = _interopRequireDefault(require("./mappingOfOT.route"));

var _staffPosVerticalUnits = _interopRequireDefault(require("./staffPosVerticalUnits.route"));

var _udCategoryOptions = _interopRequireDefault(require("./udCategoryOptions.route"));

var _entomologicalLarvicidalList = _interopRequireDefault(require("./entomologicalLarvicidalList.route"));

var _mfPositiveLineList = _interopRequireDefault(require("./mfPositiveLineList.route"));

var _designations = _interopRequireDefault(require("./designations.route"));

var _institutionTypes = _interopRequireDefault(require("./institutionTypes.route"));

var _activities = _interopRequireDefault(require("./activities.route"));

var _screens = _interopRequireDefault(require("./screens.route"));

var _userRoleScreenActivities = _interopRequireDefault(require("./userRoleScreenActivities.route"));

var _mdaIDACoverage = _interopRequireDefault(require("./mdaIDACoverage.route"));

var _verticalControlUnits = _interopRequireDefault(require("./verticalControlUnits.route"));

var _LFReportRoute = _interopRequireDefault(require("./LFReportRoute"));

var _MFReportRoute = _interopRequireDefault(require("./MFReportRoute"));

var _FSURepotRoutes = _interopRequireDefault(require("./FSURepotRoutes"));

var _FCUReportRoutes = _interopRequireDefault(require("./FCUReportRoutes"));

var _TASReportRoutes = _interopRequireDefault(require("./TASReportRoutes"));

var _MDAReportRoutes = _interopRequireDefault(require("./MDAReportRoutes"));

var _SAEReport = _interopRequireDefault(require("./SAEReport"));

var _entomologyReportRoutes = _interopRequireDefault(require("./entomologyReportRoutes"));

var _VerticalStockReportRoutes = _interopRequireDefault(require("./VerticalStockReportRoutes"));

var _GraphRoutes = _interopRequireDefault(require("./GraphRoutes"));

var _mapRoutes = _interopRequireDefault(require("./mapRoutes"));

var _sitesettings = _interopRequireDefault(require("./sitesettings.route"));

var _dashboardRoutes = _interopRequireDefault(require("./dashboardRoutes"));

var _hydrocelectomyOperations = _interopRequireDefault(require("./hydrocelectomyOperations.route"));

var _HydrocelectomyOperationsReport = _interopRequireDefault(require("./HydrocelectomyOperationsReport.route"));

var _MMDPKitsReport = _interopRequireDefault(require("./MMDPKitsReport.route"));

var _FSUZoneReport = _interopRequireDefault(require("./FSUZoneReport.route"));

var _FCUMisMtrReport = _interopRequireDefault(require("./FCUMisMtrReport.route"));

var _NCMisMtrReport = _interopRequireDefault(require("./NCMisMtrReport.route"));

var _RCOMisMtrReport = _interopRequireDefault(require("./RCOMisMtrReport.route"));

var _YearwiseMisMtrReport = _interopRequireDefault(require("./YearwiseMisMtrReport.route"));

var _InventoryMisMtrReport = _interopRequireDefault(require("./InventoryMisMtrReport.route"));

var _EntomologicalMisMtrReport = _interopRequireDefault(require("./EntomologicalMisMtrReport.route"));

var _HydroceleOpsMisMtrReport = _interopRequireDefault(require("./HydroceleOpsMisMtrReport.route"));

var router = _express["default"].Router();

function _validateToken(token) {
  var token = token.replace("Bearer ", "");
  console.log("_validateToken", token);
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var decoded, currentTime;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _auth["default"].decode(token);

            case 2:
              decoded = _context.sent;
              currentTime = (0, _moment["default"])().unix();

              if (decoded && currentTime < decoded.exp) {
                resolve({
                  status: "true",
                  msg: "Successful Authorization!",
                  decoded: decoded
                });
              } else {
                console.log("TOKEN EXPIREDDDDD");
                reject({
                  status: false,
                  msg: "Invalid Token"
                });
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

function checkAuth(req, res, next) {
  var allowedUrls = ["/auth/login", "/auth/forgotPassword", "/auth/verifyOtp", "/auth/resetPassword", "/users/create"];

  if (req.method === "GET" && (req.url.split("?")[0].indexOf("/websitecontent") >= 0 || req.url.split("?")[0].indexOf("/sitesettings") >= 0 || req.url.split("?")[0].indexOf("/map") >= 0)) {
    next();
  } else {
    if (req.method !== "OPTIONS" && !_lodash["default"].includes(allowedUrls, req.url.split("?")[0])) {
      var token = req.headers["Authorization"] || req.headers["authorization"];

      if (token) {
        _validateToken(token).then(function (res) {
          console.log("_validateToken", res);
          next();
        }, function (err) {
          res.status(403).send({
            status: "false",
            msg: "Failed to authenticate user - USER",
            err: err
          });
        });
      } else {
        res.status(403).send({
          status: "false",
          msg: "Failed to authenticate user - USER"
        });
      }
    } else {
      next();
    }
  }
}

router.get("/health-check", function (req, res) {
  return res.send("OK!!!");
});
router.use(checkAuth);
router.use("/users", _user["default"]);
router.use("/auth", _auth2["default"]);
router.use("/role", _role["default"]);
router.use("/websitecontent-news", _websitecontentNews["default"]);
router.use("/websitecontent-programinfos", _websitecontentPrograminfos["default"]);
router.use("/websitecontent-images", _websitecontentImages["default"]);
router.use("/websitecontent-others", _websitecontentOthers["default"]);
router.use("/websitecontent-videos", _websitecontentVideos["default"]);
router.use("/websitecontent", _websitecontent["default"]);
router.use("/websitecontent-alert", _websitecontentAlert["default"]);
router.use("/websitecontent-faq", _websitecontentFaq["default"]);
router.use("/state", _state["default"]);
router.use("/sitesettings", _sitesettings["default"]);
router.use("/district", _district["default"]);
router.use("/getDistrictByVerticalControlUnit", _districtByVCU["default"]);
router.use("/taluka", _taluka["default"]);
router.use("/village", _village["default"]);
router.use("/corporation", _corporation["default"]);
router.use("/zone", _zone["default"]);
router.use("/ward", _ward["default"]);
router.use("/facilities", _facilities["default"]);
router.use("/subCenters", _subcenter["default"]);
router.use("/lymphedemaLineList", _LymphedemaLHLineList["default"]);
router.use("/tasSurvey", _tasSurvey["default"]);
router.use("/PostMDAEvalList", _postMDAEvalList["default"]);
router.use("/fsuTarget", _fsuTargetAchievements["default"]);
router.use("/mdaActivity", _mdaIECActivities["default"]);
router.use("/preMDAActivity", _preMDAActivities["default"]);
router.use("/verticalUnit", _verticalUnitStockPositions["default"]);
router.use("/mappingOfOT", _mappingOfOT["default"]);
router.use("/staffPosVerticalUnits", _staffPosVerticalUnits["default"]);
router.use("/udCategoryOptions", _udCategoryOptions["default"]);
router.use("/entomologicalLarvical", _entomologicalLarvicidalList["default"]);
router.use("/mfPositive", _mfPositiveLineList["default"]);
router.use("/designations", _designations["default"]);
router.use("/institutionTypes", _institutionTypes["default"]);
router.use("/activities", _activities["default"]);
router.use("/screens", _screens["default"]);
router.use("/userRoleScreenActivities", _userRoleScreenActivities["default"]);
router.use("/mdaIdaCoverageReport", _mdaIDACoverage["default"]);
router.use("/verticalControl", _verticalControlUnits["default"]);
router.use("/LFReport", _LFReportRoute["default"]);
router.use("/MFReport", _MFReportRoute["default"]);
router.use("/FSUReport", _FSURepotRoutes["default"]);
router.use("/FCUReport", _FCUReportRoutes["default"]);
router.use("/TASReport", _TASReportRoutes["default"]);
router.use("/MDAReport", _MDAReportRoutes["default"]);
router.use("/SAEReport", _SAEReport["default"]);
router.use("/EntomologyReport", _entomologyReportRoutes["default"]);
router.use("/VerticalStockReport", _VerticalStockReportRoutes["default"]);
router.use("/Graph", _GraphRoutes["default"]);
router.use("/map", _mapRoutes["default"]);
router.use("/dashboard", _dashboardRoutes["default"]);
router.use("/hydrocelectomyOperations", _hydrocelectomyOperations["default"]);
router.use("/hydrocelectomyOperationsReport", _HydrocelectomyOperationsReport["default"]);
router.use("/mmdpKitsReport", _MMDPKitsReport["default"]);
router.use("/fsuZoneReport", _FSUZoneReport["default"]);
router.use("/fcuMisMtrReport", _FCUMisMtrReport["default"]);
router.use("/ncMisMtrReport", _NCMisMtrReport["default"]);
router.use("/rcoMisMtrReport", _RCOMisMtrReport["default"]);
router.use("/yearwiseMisMtrReport", _YearwiseMisMtrReport["default"]);
router.use("/inventoryMisMtrReport", _InventoryMisMtrReport["default"]);
router.use("/entomologicalMisMtrReport", _EntomologicalMisMtrReport["default"]);
router.use("/hydroceleOpsMisMtrReport", _HydroceleOpsMisMtrReport["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.route.js.map
