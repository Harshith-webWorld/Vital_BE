"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lodash = _interopRequireDefault(require("lodash"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _schemas = require("./schemas");

module.exports = function (context) {
  return function (req, res, next) {
    var _supportedMethods = ['post', 'put', 'get', 'patch', 'delete']; // Joi validation options

    var _validationOptions = {
      abortEarly: false,
      // abort after the last validation error
      // allowUnknown: true, // allow unknown keys that will be ignored
      stripUnknown: true // remove unknown keys from the validated data

    };
    var schemas = {
      body: _schemas.bodySchema,
      query: _schemas.querySchema
    };
    var route = req.originalUrl.split("?")[0];
    var method = req.method.toLowerCase();

    var _schema = _lodash["default"].get(schemas[context], route);

    if (_schema) {
      if (_lodash["default"].includes(_supportedMethods, method) && _lodash["default"].has(schemas[context], route)) {
        var _schema$validate = _schema.validate(req[context], _validationOptions),
            value = _schema$validate.value,
            error = _schema$validate.error;

        if (error) {
          var JoiError = {
            status: 'failed',
            error: {
              original: error._object,
              // fetch only message and type from each error
              details: _lodash["default"].map(error.details, function (_ref) {
                var message = _ref.message,
                    type = _ref.type;
                return {
                  message: message.replace(/['"]/g, ''),
                  type: type
                };
              })
            }
          };
          return res.status(_httpStatus["default"].UNPROCESSABLE_ENTITY).json({
            status: _httpStatus["default"].UNPROCESSABLE_ENTITY,
            message: JoiError
          });
        } else {
          req[context] = value;
        }
      }
    }

    next();
  };
};
//# sourceMappingURL=schemaValidator.js.map
