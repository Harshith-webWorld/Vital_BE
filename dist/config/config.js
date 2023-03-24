"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

require("dotenv").config();

var envVarsSchema = _joi["default"].object({
  NODE_ENV: _joi["default"].string().allow("development", "production", "test", "provision")["default"]("development"),
  PORT: _joi["default"].number()["default"](5005),
  PROTOCAL: _joi["default"].string()["default"]("http://"),
  ANDROID_API_KEY: _joi["default"].string()["default"]("e3O9UcPA3NM:APA91bGPphbb_1q6xUxLWv5lLQo78TBAGIuOcGFK1rcaV2eK-LvQUe9CuFoIOsGk7tpu1VYHOlHeRnxkLEoPoM214mfdKlsnTn4Mkd4R_MLamF49v2ax1W93eys7kVhJ5ir8VEliSyjE"),
  API_VERSION: _joi["default"].string()["default"]("1.0").description("API Version"),
  SECURITY_SALT: _joi["default"].string()["default"]("SECURE$U#&*123").description("API Version"),
  JWT_TOKEN_EXPIRE: _joi["default"].string()["default"]("5d").description("JWT Token Expired in Days"),
  JWT_SECRET: _joi["default"].string().required()["default"]("CONST$U#&*123").description("JWT Secret Code"),
  BASE_URL: _joi["default"].string()["default"]("localhost"),
  COMMON_MAIL: _joi["default"].string()["default"]("anujarani.m@greatinnovus.com").description("Common Email Id"),
  COMMON_MAIL_PASSWORD: _joi["default"].string()["default"]("murugansivan@123").description("Common Email Id Password"),
  SMTP_SERVICE: _joi["default"].string()["default"]("gmail").description("Email SMTP service"),
  SMTP_HOST: _joi["default"].string()["default"]("smtp.gmail.com").description("Email SMTP host"),
  SMTP_PORT: _joi["default"].number()["default"](25),
  UPLOAD_PATH: _joi["default"].string()["default"]("/uploads").description("uploads"),
  PG_DB: _joi["default"].string()["default"]("construction").description("construction"),
  PG_PORT: _joi["default"].number()["default"](5432),
  PG_HOST: _joi["default"].string()["default"]("localhost"),
  PG_USER: _joi["default"].string()["default"]("postgres").description("postgres"),
  PG_PASSWORD: _joi["default"].string()["default"]("root").allow("").description("construction")
}).unknown().required();

var _envVarsSchema$valida = envVarsSchema.validate(process.env),
    error = _envVarsSchema$valida.error,
    envVars = _envVarsSchema$valida.value;

if (error) {
  throw new Error("Config validation error: ".concat(error.message));
}

var config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  port_https: envVars.PORT_HTTPS,
  apiVersion: envVars.API_VERSION,
  jwtSecret: envVars.JWT_SECRET,
  jwtTokenExpire: envVars.JWT_TOKEN_EXPIRE,
  uploadPath: envVars.UPLOAD_PATH,
  SECURITY_SALT: envVars.SECURITY_SALT,
  commonEmail: envVars.COMMON_MAIL,
  commonEmailPwd: envVars.COMMON_MAIL_PASSWORD,
  BASE_URL: envVars.BASE_URL,
  PROTOCAL: envVars.PROTOCAL,
  API_KEY: envVars.ANDROID_API_KEY,
  postgres: {
    db: envVars.PG_DB,
    port: envVars.PG_PORT,
    host: envVars.PG_HOST,
    user: envVars.PG_USER,
    password: envVars.PG_PASSWORD
  },
  smtpService: envVars.SMTP_SERVICE,
  smtpHost: envVars.SMTP_HOST,
  smtpPort: envVars.SMTP_PORT
};
var _default = config;
exports["default"] = _default;
//# sourceMappingURL=config.js.map
