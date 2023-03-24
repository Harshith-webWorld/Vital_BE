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

var VerticalStockReportDao = function VerticalStockReportDao() {
  var VerticalStockAnalysisDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, districtId, year, unitName, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          districtId = "and  VT.\"districtId\" = ".concat(req.body.districtId);
                          year = "and VT.year =  ".concat(req.body.year);
                          unitName = "and  VT.\"unitName\" = ".concat(req.body.unitName);
                          start_month = "and  VT.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  VT.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.unitName.length == 0) {
                            unitName = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select VT.\"year\",VT.month,VT.\"districtId\",D.\"districtName\", \n            VT.\"unitName\" as \"nameOfControlUnitId\", V.\"nameOfControlUnit\",\n            VT.items AS \"itemId\",UD1.\"categoryOptionName\" AS \"itemName\",\n            VT.\"openingBalanceQty\",VT.\"receivedDuringMonthQty\",\n            (case when (\"receivedFromWhomOthers\" is not null and \"receivedFromWhomOthers\" <> '')then \"receivedFromWhomOthers\"\n            when VT.\"receivedFromDistricts\" >0 then D.\"districtName\"\n            else VT.\"receivedFromWhom\" end) as \"receivedFromWhom\",\n            \"totalStock\",\"actualConsumption\",\n            \"issueToOtherQty\",\"issuedToWhom\",\n            \"balanceEndOfMonth\",\"reqNext3MonthsQty\"\n            from public.\"verticalUnitStockPositions\" VT\n            left join public.districts D ON D.id=VT.\"districtId\"\n            left join public.districts D1 ON D1.id=VT.\"receivedFromDistricts\"\n            left join public.\"verticalControlUnits\" V ON V.id=VT.\"unitName\"\n            left join public.\"udCategoryOptions\" UD1 ON UD1.id=VT.\"items\"\n                    where VT.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "  ").concat(unitName, "\n\t")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            response.error = false;
                            response.data = results;
                            console.log("results", results);
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
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

    return function VerticalStockAnalysisDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var vspMonthlyVacancyStatusDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, districtId, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          districtId = "and  S.\"districtId\" = ".concat(req.body.districtId);
                          year = "and S.year =  ".concat(req.body.year);
                          start_month = "and  S.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  S.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select year,month, S.\"districtId\",  S.\"nameOfUnit\" AS \"nameOfUnitId\", \n            D.\"districtName\", VC.\"nameOfControlUnit\" AS \"nameOfUnit\", S.cadre AS \"cadreId\", S.\"cadreOther\",\n            UD1.\"categoryOptionName\" AS \"cadre\", S.sanctioned, S.filled, S.vacant\n            from public.\"staffPosVerticalUnits\" S\n            left join public.districts D on D.id =  S.\"districtId\"\n            left join public.\"verticalControlUnits\" VC on VC.id = S.\"nameOfUnit\"\n            left join public.\"udCategoryOptions\" UD1 on UD1.id=S.\"cadre\"\n                    where S.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "\n\t")).then(function (_ref7) {
                            var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                                results = _ref8[0],
                                metadata = _ref8[1];

                            response.error = false;
                            response.data = results;
                            console.log("results", results);
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function vspMonthlyVacancyStatusDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var vspTrainingStatusDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, districtId, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          districtId = "and  S.\"districtId\" = ".concat(req.body.districtId);
                          year = "and S.year =  ".concat(req.body.year);
                          start_month = "and  S.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  S.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select year,month, S.\"districtId\",  S.\"nameOfUnit\" AS \"nameOfUnitId\",\n            D.\"districtName\", VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\n            SS.\"designationId\", SS.\"designationOther\",DG.\"designationName\" AS \"designation\",\n            ST.\"typeOfTraining\",ST.\"placeOfTraining\",ST.\"dateOfTraining\",ST.\"isTrained\"\n            from public.\"staffPosVerticalUnits\" S\n            left join public.\"staffPosVerticalUnitStaffs\" SS ON SS.\"staffPosVerticalUnitId\"=S.id\n            left join public.\"staffPosVerticalUnitTrainingStatuses\" ST\n            ON ST.\"staffPosVerticalUnitId\"=S.id AND ST.\"staffPosVerticalUnitStaffId\"=SS.id\n            left join public.districts D on D.id =  S.\"districtId\"\n            left join public.\"verticalControlUnits\" VC on VC.id = S.\"nameOfUnit\"\n            left join public.designations DG on DG.id=SS.\"designationId\"\n            where S.\"isActive\"=true\n            ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "  \n\t        ")).then(function (_ref11) {
                            var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                                results = _ref12[0],
                                metadata = _ref12[1];

                            response.error = false;
                            response.data = results;
                            console.log("results", results);
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x6) {
                  return _ref10.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function vspTrainingStatusDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var vspAvailabilityConsumptionLabmaterialsDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response, districtId, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {};
                          districtId = "and  S.\"districtId\" = ".concat(req.body.districtId);
                          year = "and S.year =  ".concat(req.body.year);
                          start_month = "and  S.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  S.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\tselect S.year,S.month, S.\"districtId\",S.\"unitName\" AS \"unitNameId\",\n            D.\"districtName\", VC.\"nameOfControlUnit\" AS \"unitName\",\n            N.\"districtName\" AS \"receivedFromDistrictName\",\n            S.items,UD.\"categoryOptionName\" \"itemName\", S.\"openingBalanceQty\",S.\"receivedDuringMonthQty\",S.\"receivedFromWhom\",\n            S.\"receivedFromDistricts\",S.\"receivedFromWhomOthers\",S.\"totalStock\",S.\"actualConsumption\",\n            S.\"issueToOtherQty\",S.\"issuedToWhom\",S.\"balanceEndOfMonth\",S.\"reqNext3MonthsQty\"\n            from public.\"verticalUnitStockPositions\" S\n            left join public.districts D on D.id =  S.\"districtId\"\n            left join public.districts N on N.id =  S.\"receivedFromDistricts\"\n            left join public.\"verticalControlUnits\" VC on VC.id = S.\"unitName\"\n\t\t\tleft join public.\"udCategoryOptions\" UD ON UD.id=S.items\n            where S.\"isActive\"=true\n            ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " \n\t        ")).then(function (_ref15) {
                            var _ref16 = (0, _slicedToArray2["default"])(_ref15, 2),
                                results = _ref16[0],
                                metadata = _ref16[1];

                            response.error = false;
                            response.data = results;
                            console.log("results", results);
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x8) {
                  return _ref14.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function vspAvailabilityConsumptionLabmaterialsDao(_x7) {
      return _ref13.apply(this, arguments);
    };
  }();

  return {
    VerticalStockAnalysisDao: VerticalStockAnalysisDao,
    vspMonthlyVacancyStatusDao: vspMonthlyVacancyStatusDao,
    vspTrainingStatusDao: vspTrainingStatusDao,
    vspAvailabilityConsumptionLabmaterialsDao: vspAvailabilityConsumptionLabmaterialsDao
  };
};

var _default = VerticalStockReportDao();

exports["default"] = _default;
//# sourceMappingURL=VerticalStockReportDao.js.map
