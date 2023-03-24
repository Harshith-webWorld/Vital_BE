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

var TASReportDao = function TASReportDao() {
  var get_TASReport1_SchoolDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, date, DateOfSurvey, nameOfEUEA;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          date = req.body.Date_of_survey; // console.log(date)

                          // console.log(date)
                          DateOfSurvey = "and  T.\"DateOfSurvey\" = '".concat(date, "'");
                          nameOfEUEA = "and T.\"nameOfEU\"=  '".concat(req.body.name_Of_EU, "'");

                          if (req.body.Date_of_survey.length == 0) {
                            DateOfSurvey = "";
                          }

                          if (req.body.name_Of_EU == 0) {
                            nameOfEUEA = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select T.\"nameOfEU\",T.\"nameOfSchool\",T.\"DateOfSurvey\",T.\"serialNoOfSchool\",\n            T.\"typeOfSchool\",T.\"tokenNumberSB\" from public.\"tasSurveys\" T\n            where T.\"isActive\"=true\n        ".concat(DateOfSurvey, " ").concat(nameOfEUEA, "\n\t")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 7:
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

    return function get_TASReport1_SchoolDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_TASReport1_StudentDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, date, DateOfSurvey, nameOfEUEA;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          date = req.body.Date_of_survey; // console.log(date)

                          // console.log(date)
                          DateOfSurvey = "and  T.\"DateOfSurvey\" = '".concat(date, "'");
                          nameOfEUEA = "and T.\"nameOfEU\"=  '".concat(req.body.name_Of_EU, "'");

                          if (req.body.Date_of_survey.length == 0) {
                            DateOfSurvey = "";
                          }

                          if (req.body.name_Of_EU == 0) {
                            nameOfEUEA = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select \n            TC.\"nameOfStudent\",TC.\"ageYears\",TC.\"ageMonths\",UD.\"categoryOptionName\" sex,TC.result\n            from public.\"tasSurveys\" T \n            left join public.\"tasSurveyChildrens\" TC ON TC.\"tasSurveyId\"=T.ID\n            left join public.\"udCategoryOptions\" UD ON UD.\"id\"=TC.sex\n             where T.\"isActive\"=true\n        ".concat(DateOfSurvey, " ").concat(nameOfEUEA, "\n\t")).then(function (_ref7) {
                            var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                                results = _ref8[0],
                                metadata = _ref8[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 7:
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

    return function get_TASReport1_StudentDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var get_TASReport2Dao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, nameOfStudent, nameOfSchool;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          nameOfStudent = "and  TC.\"nameOfStudent\" = '".concat(req.body.name_of_student, "'");
                          nameOfSchool = "and T.\"nameOfSchool\" =  '".concat(req.body.name_of_school, "'");

                          if (req.body.name_of_student.length == 0) {
                            nameOfStudent = "";
                          }

                          if (req.body.name_of_school.length == 0) {
                            nameOfSchool = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select \n            TC.\"nameOfStudent\",T.\"nameOfSchool\",T.\"districtId\",T.\"villageId\",T.\"wardId\",\n            D.\"districtName\",V.\"villageName\",W.\"wardName\",\n            '' AS \"fatherName\",TC.\"ageYears\",TC.\"ageMonths\",\n            UD.\"categoryOptionName\" sex,'' AS \"completePermanentAddress\",'' AS \"dateOfICT\"\n            from public.\"tasSurveys\" T\n            left join public.\"tasSurveyChildrens\" TC ON TC.\"tasSurveyId\"=T.id\n            left join public.\"udCategoryOptions\" UD ON UD.\"id\"=TC.sex\n            left join public.districts D on D.id = T.\"districtId\"\n            left join public.villages V on V.id = T.\"villageId\"\n            left join public.wards W on W.id = T.\"wardId\"\n            where T.\"isActive\"=true\n        ".concat(nameOfStudent, " ").concat(nameOfSchool, "\n\t")).then(function (_ref11) {
                            var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                                results = _ref12[0],
                                metadata = _ref12[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 6:
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

    return function get_TASReport2Dao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  return {
    get_TASReport1_SchoolDao: get_TASReport1_SchoolDao,
    get_TASReport1_StudentDao: get_TASReport1_StudentDao,
    get_TASReport2Dao: get_TASReport2Dao
  };
};

var _default = TASReportDao();

exports["default"] = _default;
//# sourceMappingURL=TASReportDao.js.map
