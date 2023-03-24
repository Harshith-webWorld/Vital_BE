"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

module.exports = function (sequelize, DataTypes) {
  var _sequelize$define;

  var villages = sequelize.define("villages", (_sequelize$define = {
    villageName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    subCenterId: {
      type: DataTypes.INTEGER
    },
    facilityId: {
      type: DataTypes.INTEGER
    },
    talukaId: {
      type: DataTypes.INTEGER
    },
    districtId: {
      type: DataTypes.INTEGER
    }
  }, (0, _defineProperty2["default"])(_sequelize$define, "subCenterId", {
    type: DataTypes.INTEGER
  }), (0, _defineProperty2["default"])(_sequelize$define, "stateId", {
    type: DataTypes.INTEGER
  }), (0, _defineProperty2["default"])(_sequelize$define, "mapId", {
    type: DataTypes.STRING(10)
  }), (0, _defineProperty2["default"])(_sequelize$define, "isActive", {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }), (0, _defineProperty2["default"])(_sequelize$define, "createdBy", {
    type: DataTypes.INTEGER
  }), (0, _defineProperty2["default"])(_sequelize$define, "lastModifiedBy", {
    type: DataTypes.INTEGER
  }), _sequelize$define));

  villages.associate = function (models) {
    villages.hasMany(models.lymphedemaLineList, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.belongsTo(models.subCenters, {
      foreignKey: "subCenterId",
      allowNull: false,
      constraints: false
    });
    villages.belongsTo(models.facilities, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    villages.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    villages.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    villages.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    villages.belongsTo(models.talukas, {
      foreignKey: "talukaId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.subCenters, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.postMDAEvalList, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.tasSurvey, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.preMDAActivities, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.entomologicalLarvicidalList, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.mfPositiveLineList, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.verticalControlFieldUnits, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    villages.hasMany(models.mdaIDACoverages, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
  };

  return villages;
};
//# sourceMappingURL=Villages.js.map
