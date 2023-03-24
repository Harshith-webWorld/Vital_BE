"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _httpStatus = _interopRequireDefault(require("http-status"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _MMDPKitsReportDao = _interopRequireDefault(require("../dao/MMDPKitsReportDao"));

var MMDPKitsReportController = function MMDPKitsReportController() {
  var getMMDPKitsReportController = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, getMMDPKitsReportDao, _ret;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context.next = 7;
              return _MMDPKitsReportDao["default"].getMMDPKitsReportDao(req);

            case 7:
              getMMDPKitsReportDao = _context.sent;

              if (!getMMDPKitsReportDao.error) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              _ret = function () {
                var circles = {
                  thaneCircle: [24, 27, 33],
                  nashikCircle: [9, 21, 13, 22, 1],
                  puneCircle: [26, 30, 32],
                  kolhapurCircle: [15, 29, 28, 31],
                  aurangabadCircle: [4, 14, 25, 12],
                  laturCircle: [16, 5, 23, 20],
                  akolaCircle: [35, 36, 2, 3, 7],
                  nagpurCircle: [6, 8, 11, 10, 19, 34]
                };
                var zones = {
                  thaneZone: [],
                  nashikZone: [],
                  puneZone: [],
                  kolhapurZone: [],
                  aurangabadZone: [],
                  laturZone: [],
                  akolaZone: [],
                  nagpurZone: []
                };
                var zoneNames = {
                  thaneZone: "Thane Circle",
                  nashikZone: "Nashik Circle",
                  puneZone: "Pune Circle",
                  kolhapurZone: "Kolhapur Circle",
                  aurangabadZone: "Aurangabad Circle",
                  laturZone: "Latur Circle",
                  akolaZone: "Akola Circle",
                  nagpurZone: "Nagpur Circle"
                };
                var restDistricts = [];

                var groupBy = function groupBy(xs, key) {
                  return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                  }, {});
                };

                var groupedByDistrictName = groupBy(getMMDPKitsReportDao.data, 'districtName');
                var monthsCombined = [];
                Object.keys(groupedByDistrictName).forEach(function (districtName) {
                  var tempObj = {
                    districtName: districtName,
                    districtId: groupedByDistrictName[districtName][0].districtId,
                    total: 0,
                    jan: 0,
                    feb: 0,
                    mar: 0,
                    apr: 0,
                    may: 0,
                    jun: 0,
                    jul: 0,
                    aug: 0,
                    sep: 0,
                    oct: 0,
                    nov: 0,
                    dec: 0
                  };
                  groupedByDistrictName[districtName].forEach(function (data) {
                    var month = _utils["default"].monthIdtoMonth[data.month];
                    tempObj[month] = data.count;
                    tempObj["total"] = tempObj["total"] + +data.count;
                  });
                  console.log("tempObj", tempObj);
                  monthsCombined.push(tempObj);
                });

                var sumItems = function sumItems(items, prop) {
                  return items.reduce(function (a, b) {
                    return +a + +b[prop];
                  }, 0);
                };

                monthsCombined.forEach(function (data) {
                  if (circles.thaneCircle.includes(data.districtId)) zones.thaneZone.push(data);else if (circles.nashikCircle.includes(data.districtId)) zones.nashikZone.push(data);else if (circles.puneCircle.includes(data.districtId)) zones.puneZone.push(data);else if (circles.kolhapurCircle.includes(data.districtId)) zones.kolhapurZone.push(data);else if (circles.aurangabadCircle.includes(data.districtId)) zones.aurangabadZone.push(data);else if (circles.laturCircle.includes(data.districtId)) zones.laturZone.push(data);else if (circles.akolaCircle.includes(data.districtId)) zones.akolaZone.push(data);else if (circles.nagpurCircle.includes(data.districtId)) zones.nagpurZone.push(data);else restDistricts.push(data);
                });
                var circleLevelSum = [];
                var onlyCircles = [];
                var toSumProps = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "total"];

                var _loop = function _loop() {
                  var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
                      key = _Object$entries$_i[0],
                      value = _Object$entries$_i[1];

                  if (!value.length) return "continue";
                  var rolledUp = {};
                  toSumProps.forEach(function (prop) {
                    rolledUp[prop] = sumItems(value, prop);
                  });
                  rolledUp["districtName"] = zoneNames[key];
                  rolledUp["highlight"] = true;
                  onlyCircles.push(rolledUp);
                  circleLevelSum.push.apply(circleLevelSum, (0, _toConsumableArray2["default"])(value).concat([rolledUp]));
                };

                for (var _i = 0, _Object$entries = Object.entries(zones); _i < _Object$entries.length; _i++) {
                  var _ret2 = _loop();

                  if (_ret2 === "continue") continue;
                }

                circleLevelSum.push.apply(circleLevelSum, restDistricts);

                if (onlyCircles.length) {
                  var rolledUp = {};
                  toSumProps.forEach(function (prop) {
                    rolledUp[prop] = sumItems(onlyCircles, prop);
                  });
                  rolledUp["districtName"] = "Maharashtra State Total";
                  rolledUp["highlight"] = true;
                  circleLevelSum.push(rolledUp);
                }

                return {
                  v: res.status(_httpStatus["default"].OK).json({
                    status: _httpStatus["default"].OK,
                    // hydroceleOperationsReport: getMMDPKitsReportDao.data,
                    data: circleLevelSum,
                    // groupedByDistrictName,
                    // monthsCombined,
                    message: _resources["default"].LABEL_SUCCESS
                  })
                };
              }();

              if (!((0, _typeof2["default"])(_ret) === "object")) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", _ret.v);

            case 15:
              _context.next = 22;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 17]]);
    }));

    return function getMMDPKitsReportController(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getMMDPKitsReportController: getMMDPKitsReportController
  };
};

var _default = MMDPKitsReportController();

exports["default"] = _default;
//# sourceMappingURL=MMDPKitsReportController.js.map
