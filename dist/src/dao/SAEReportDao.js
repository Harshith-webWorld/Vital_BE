"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var lymphedemaLineList = _sequelize["default"].lymphedemaLineList,
    lymphedemaLineListSurvey = _sequelize["default"].lymphedemaLineListSurvey,
    lymphedemaLineListFollowUpsLF = _sequelize["default"].lymphedemaLineListFollowUpsLF,
    lymphedemaLineListFollowUpsHF = _sequelize["default"].lymphedemaLineListFollowUpsHF,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits,
    verticalControlUnits = _sequelize["default"].verticalControlUnits,
    states = _sequelize["default"].states,
    districts = _sequelize["default"].districts,
    corporations = _sequelize["default"].corporations,
    talukas = _sequelize["default"].talukas,
    zones = _sequelize["default"].zones,
    facilities = _sequelize["default"].facilities,
    subCenters = _sequelize["default"].subCenters,
    wards = _sequelize["default"].wards,
    villages = _sequelize["default"].villages;
var Op = _sequelize["default"].Sequelize.Op;
var sqDB = _sequelize["default"].Sequelize.sqDb;

var SAEReportDao = function SAEReportDao() {
  var reportdao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, start_month, end_month, year;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.startMonth, " ");
                          end_month = "and  ".concat(req.endMonth);

                          if (req.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          year = '';

                          if (!req.year.length == 0) {
                            year = "and Year =  ".concat(req.year);
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("select D.\"districtName\",MDA.*,\n\t\t\tCOALESCE((MDA.\"noOfPersonsWithFever\" + MDA.\"noOfPersonsWithHeadache\" + MDA.\"noOfPersonsWithBodyache\"\n \t\t\t+ MDA.\"noOfPersonsWithNausea\" + MDA.\"noOfPersonsWithVomiting\" + MDA.\"noOfPersonsWithOther\"),0) AS \"NoOfPersonsWithSAE\"\n\t\t\tfrom\n\t\t\t(\n\t\t\tselect M1.\"districtId\",\n\t\t\tCOALESCE((M1.\"noOfPersonsWithFever\" + M2.\"noOfPersonsWithFever\"),0) AS \"noOfPersonsWithFever\",\n\t\t\tCOALESCE((M3.\"noOfPersonsWithHeadache\" + M4.\"noOfPersonsWithHeadache\"),0) AS \"noOfPersonsWithHeadache\",\n\t\t\tCOALESCE((M5.\"noOfPersonsWithBodyache\" + M6.\"noOfPersonsWithBodyache\"),0) AS \"noOfPersonsWithBodyache\",\n\t\t\tCOALESCE((M7.\"noOfPersonsWithNausea\" + M8.\"noOfPersonsWithNausea\"),0) AS \"noOfPersonsWithNausea\",\n\t\t\tCOALESCE((M9.\"noOfPersonsWithVomiting\" + M10.\"noOfPersonsWithVomiting\"),0) AS \"noOfPersonsWithVomiting\",\n\t\t\tCOALESCE(M11.\"noOfPersonsWithOther\",0) AS \"noOfPersonsWithOther\" ,\n\t\t\tCOALESCE((M12.\"noOfPersonsRecovered\" + M13.\"noOfPersonsRecovered\"),0) AS \"noOfPersonsRecovered\",\n\t\t\tCOALESCE((M12.\"noOfPersonsNotRecovered\" + M13.\"noOfPersonsRecovered\"),0) AS \"noOfPersonsNotRecovered\",\t\t\n\t\t\tCOALESCE((M14.\"requiredHospitalStay\" + M15.\"requiredHospitalStay\"),0) AS \"requiredHospitalStay\"\n\tfrom\n\t(\n\t\tselect M.\"districtId\",sum(MR.\"noOfPersonsWithFever\"::integer) AS \"noOfPersonsWithFever\" from public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n\t\twhere MR.\"noOfPersonsWithFever\" is not null\n\t\tgroup by M.\"districtId\"\n\t) M1 LEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MP.\"noOfPersonsWithFever\"::integer) AS \"noOfPersonsWithFever\" from \n\t\tpublic.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n\t\twhere MP.\"noOfPersonsWithFever\" is not null\n".concat(year, " ").concat(start_month, " ").concat(end_month, "\t\ngroup by M.\"districtId\"\n\t)M2 ON M1.\"districtId\"=M2.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MR.\"noOfPersonsWithHeadache\"::integer) AS \"noOfPersonsWithHeadache\" from \n\t\tpublic.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n\t\twhere MR.\"noOfPersonsWithHeadache\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\t\ngroup by M.\"districtId\"\n\t) M3 ON M3.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MP.\"noOfPersonsWithHeadache\"::integer) AS \"noOfPersonsWithHeadache\" from\n\t\t public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n\t\twhere MP.\"noOfPersonsWithHeadache\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\t\ngroup by M.\"districtId\"\n\t)M4 ON M4.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MR.\"noOfPersonsWithBodyache\"::integer) AS \"noOfPersonsWithBodyache\" from\n\t\t public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n\t\twhere MR.\"noOfPersonsWithBodyache\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\ngroup by M.\"districtId\"\n\t) M5 ON M5.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MP.\"noOfPersonsWithBodyache\"::integer) AS \"noOfPersonsWithBodyache\" \n\t\tfrom public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n\t\twhere MP.\"noOfPersonsWithBodyache\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\ngroup by M.\"districtId\"\n\t)M6 ON M6.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MR.\"noOfPersonsWithNausea\"::integer) AS \"noOfPersonsWithNausea\" from\n\t\t public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n\t\twhere MR.\"noOfPersonsWithNausea\" is not null\n\t\t").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\tgroup by M.\"districtId\"\n\t) M7 ON M7.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MP.\"noOfPersonsWithNausea\"::integer) AS \"noOfPersonsWithNausea\" from\n\t\t public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n\t\twhere MP.\"noOfPersonsWithNausea\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\t\ngroup by M.\"districtId\"\n\t)M8 ON M8.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MR.\"noOfPersonsWithVomiting\"::integer) AS \"noOfPersonsWithVomiting\" from \n\t\tpublic.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n\t\twhere MR.\"noOfPersonsWithVomiting\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\ngroup by M.\"districtId\"\n\t) M9 ON M9.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(MP.\"noOfPersonsWithVomiting\"::integer) AS \"noOfPersonsWithVomiting\" from \n\t\tpublic.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n\t\twhere MP.\"noOfPersonsWithVomiting\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\t\ngroup by M.\"districtId\"\n\t)M10 ON M10.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum(O.\"noOfPersonsWithOtherAdverseExp\"::integer) AS \"noOfPersonsWithOther\" from \n\t\tpublic.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageOthersLists\" O ON O.\"mdaIDACoverageId\"=M.id\n\t\twhere O.\"noOfPersonsWithOtherAdverseExp\" is not null\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\n\tgroup by M.\"districtId\"\n\t)M11 ON M11.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum( MR.\"noOfPersonsRecovered\") AS \"noOfPersonsRecovered\",\n\t\tsum( MR.\"noOfPersonsNotRecovered\") AS \"noOfPersonsNotRecovered\"\n\t\tfrom public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\t\ngroup by M.\"districtId\"\n\t) M12 ON M12.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum( MP.\"noOfPersonsRecovered\") AS \"noOfPersonsRecovered\",\n\t\tsum( MP.\"noOfPersonsNotRecovered\") AS \"noOfPersonsNotRecovered\"\n\t\tfrom public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\t\ngroup by M.\"districtId\"\n\t)M13 ON M13.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum( M.\"districtId\") AS \"requiredHospitalStay\" from public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\"=M.id\n\t\twhere MR.\"isRequiredHospitalStay\" = 'yes'\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\n\tgroup by M.\"districtId\"\n\t) M14 ON M14.\"districtId\"=M1.\"districtId\"\n\tLEFT JOIN\n\t(\n\t\tselect M.\"districtId\",sum( M.\"districtId\") AS \"requiredHospitalStay\" from public.\"mdaIDACoverages\" M\n\t\tLEFT JOIN public.\"mdaIDACoverageMopUpLists\" MP ON MP.\"mdaIDACoverageId\"=M.id\n\t\twhere MP.\"isRequiredHospitalStay\" = true\n").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\t\ngroup by M.\"districtId\"\n\t)M15 ON M15.\"districtId\"=M1.\"districtId\"\n) MDA\nLEFT JOIN public.districts D ON D.id=MDA.\"districtId\"\n\n")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            //console.log(results, metadata)
                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error, 'error');
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function reportdao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    reportdao: reportdao
  };
};

var _default = SAEReportDao();

exports["default"] = _default;
//# sourceMappingURL=SAEReportDao.js.map
