"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _sequelize2 = _interopRequireDefault(require("sequelize"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var Op = _sequelize["default"].Sequelize.Op;
var sqDB = _sequelize["default"].Sequelize.sqDb;

var HydroceleOpsMisMtrReportDao = function HydroceleOpsMisMtrReportDao() {
  var getHydroceleOpsMisMtrReportDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, year;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          year = req.body.startYear;

                          _sequelize["default"].sequelize.query("SELECT\n      d.\"districtName\",\n      COALESCE(SUM(H.jan), 0) AS \"jan\",\n      COALESCE(SUM(H.feb), 0) AS \"feb\",\n      COALESCE(SUM(H.mar), 0) AS \"mar\",\n      COALESCE(SUM(H.apr), 0) AS \"apr\",\n      COALESCE(SUM(H.may), 0) AS \"may\",\n      COALESCE(SUM(H.jun), 0) AS \"jun\",\n      COALESCE(SUM(H.jul), 0) AS \"jul\",\n      COALESCE(SUM(H.aug), 0) AS \"aug\",\n      COALESCE(SUM(H.sep), 0) AS \"sep\",\n      COALESCE(SUM(H.oct), 0) AS \"oct\",\n      COALESCE(SUM(H.nov), 0) AS \"nov\",\n      COALESCE(SUM(H.dec), 0) AS \"dec\",\n      COALESCE(SUM(H.jan + H.feb + H.mar + H.apr + H.may + H.jun + H.jul + H.aug + H.sep + H.oct + H.nov + H.dec), 0) AS \"total\"\n    FROM public.districts d\n    LEFT JOIN (SELECT\n      *\n    FROM public.\"hydrocelectomyOperations\" h\n    WHERE year = :year) h\n      ON h.\"districtId\" = d.id\n    GROUP BY h.year,\n             d.\"districtName\"", {
                            replacements: {
                              year: year
                            } // type: Sequelize.QueryTypes.SELECT

                          }).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 3:
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

    return function getHydroceleOpsMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getHydroceleOpsMisMtrReportDao: getHydroceleOpsMisMtrReportDao
  };
};

var _default = HydroceleOpsMisMtrReportDao();

exports["default"] = _default;
//# sourceMappingURL=HydroceleOpsMisMtrReportDao.js.map
