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

var _sequelize2 = _interopRequireDefault(require("sequelize"));

var _HydroceleOperationsReportDao = _interopRequireDefault(require("../dao/HydroceleOperationsReportDao"));

var hydrocelectomyOperations = _sequelize["default"].hydrocelectomyOperations,
    districts = _sequelize["default"].districts;

var HydroceleOperationsReportController = function HydroceleOperationsReportController() {
  var getHydroceleOperationsReportController = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, getHydroceleOperationsReportDao, allDistricts, _ret, data;

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
              return _HydroceleOperationsReportDao["default"].getHydroceleOperationsReportDao(req);

            case 7:
              getHydroceleOperationsReportDao = _context.sent;
              _context.next = 10;
              return districts.findAll({
                attributes: ["districtName", "id"]
              });

            case 10:
              allDistricts = _context.sent;
              console.log("getHydroceleOperationsReportDao", getHydroceleOperationsReportDao);

              if (!getHydroceleOperationsReportDao.error) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 16:
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

                var sumItems = function sumItems(items, prop) {
                  return items.reduce(function (a, b) {
                    return +a + +b[prop];
                  }, 0);
                };

                getHydroceleOperationsReportDao.data.forEach(function (data) {
                  if (circles.thaneCircle.includes(data.districtId)) zones.thaneZone.push(data);else if (circles.nashikCircle.includes(data.districtId)) zones.nashikZone.push(data);else if (circles.puneCircle.includes(data.districtId)) zones.puneZone.push(data);else if (circles.kolhapurCircle.includes(data.districtId)) zones.kolhapurZone.push(data);else if (circles.aurangabadCircle.includes(data.districtId)) zones.aurangabadZone.push(data);else if (circles.laturCircle.includes(data.districtId)) zones.laturZone.push(data);else if (circles.akolaCircle.includes(data.districtId)) zones.akolaZone.push(data);else if (circles.nagpurCircle.includes(data.districtId)) zones.nagpurZone.push(data);else restDistricts.push(data);
                });
                var circleLevelSum = [];
                var onlyCircles = [];
                var toSumProps = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "total", "totalLast", "pending"];

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
                    // hydroceleOperationsReport: getHydroceleOperationsReportDao.data,
                    data: circleLevelSum,
                    message: _resources["default"].LABEL_SUCCESS
                  })
                };
              }();

              if (!((0, _typeof2["default"])(_ret) === "object")) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", _ret.v);

            case 19:
              _context.next = 21;
              return hydrocelectomyOperations.findAndCountAll({
                where: {
                  year: {
                    $lte: req.body.year
                  }
                },
                // raw: true,
                attributes: ['hydrocelectomyOperations.districtId', 'district.districtName', [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.jan')), 'jan'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.feb')), 'feb'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.mar')), 'mar'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.apr')), 'apr'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.may')), 'may'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.jun')), 'jun'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.jul')), 'jul'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.aug')), 'aug'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.sep')), 'sep'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.oct')), 'oct'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.nov')), 'nov'], [_sequelize2["default"].fn('sum', _sequelize2["default"].col('hydrocelectomyOperations.dec')), 'dec']],
                group: ['hydrocelectomyOperations.districtId', 'district.districtName'],
                include: [{
                  model: districts,
                  required: false,
                  as: 'district',
                  attributes: ["districtName"]
                }]
              });

            case 21:
              data = _context.sent;
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 25]]);
    }));

    return function getHydroceleOperationsReportController(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getHydroceleOperationsReportController: getHydroceleOperationsReportController
  };
};

var _default = HydroceleOperationsReportController();

exports["default"] = _default;
//# sourceMappingURL=HydroceleOperationsReportController.js.map
