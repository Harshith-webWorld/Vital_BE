"use strict";

module.exports = function (sequelize, DataTypes) {
  var districts = sequelize.define("districts", {
    districtName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    districtCode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    stateId: {
      type: DataTypes.INTEGER
    },
    fsuId: {
      type: DataTypes.STRING(10)
    },
    mapId: {
      type: DataTypes.STRING(10)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER
    },
    lastModifiedBy: {
      type: DataTypes.INTEGER
    }
  });

  districts.associate = function (models) {
    districts.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    districts.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.talukas, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.villages, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.corporations, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.zones, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.wards, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.facilities, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.subCenters, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.lymphedemaLineList, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.postMDAEvalList, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.tasSurvey, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.fsuTargetAchivements, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.preMDAActivities, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.verticalUnitStockPositions, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.mappingOfOT, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.entomologicalLarvicidalList, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.mfPositiveLineList, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.mdaIDACoverages, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.verticalControlUnits, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    districts.hasMany(models.verticalControlFieldUnits, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
  };

  return districts;
};
//# sourceMappingURL=Districts.js.map
