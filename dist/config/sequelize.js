"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _lodash = _interopRequireDefault(require("lodash"));

var _config = _interopRequireDefault(require("./config"));

var _utils = _interopRequireDefault(require("../src/services/utils.service"));

console.log("configconfigconfig", _config["default"]);
var db = {};
var Op = _sequelize["default"].Op;
var operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op["in"],
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}; // connect to postgres db

var sequelize = new _sequelize["default"](_config["default"].postgres.db, _config["default"].postgres.user, _config["default"].postgres.password, {
  operatorsAliases: operatorsAliases,
  dialect: "postgres",
  port: _config["default"].postgres.port,
  host: _config["default"].postgres.host
});

var modelsDir = _path["default"].normalize("".concat(__dirname, "/../src/models")); // loop through all files in models directory ignoring hidden files and this file


_fs["default"].readdirSync(modelsDir).filter(function (file) {
  return file.indexOf(".") !== 0 && file.indexOf(".map") === -1;
}) // import model files and save model names
.forEach(function (file) {
  console.info("Loading model file ".concat(file));
  var model = sequelize["import"](_path["default"].join(modelsDir, file));
  db[model.name] = model;
}); // calling all the associate function, in order to make the association between the models


Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); // Synchronizing any model changes with database.

sequelize.sync({// force: true
  // alter: true
}).then(function () {
  console.log("DB Synced!");

  _utils["default"].initialUserRecords();
}, function (err) {
  console.log("DB Sync error : ", err);
}); // assign the sequelize variables to the db object and returning the db.

module.exports = _lodash["default"].extend({
  sequelize: sequelize,
  Sequelize: _sequelize["default"]
}, db);
//# sourceMappingURL=sequelize.js.map
