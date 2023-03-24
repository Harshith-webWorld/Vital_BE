"use strict";

module.exports = function (sequelize, DataTypes) {
  var wards = sequelize.define("wards", {
    wardName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    zoneId: {
      type: DataTypes.INTEGER
    },
    corporationId: {
      type: DataTypes.INTEGER
    },
    districtId: {
      type: DataTypes.INTEGER
    },
    stateId: {
      type: DataTypes.INTEGER
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

  wards.associate = function (models) {
    wards.hasMany(models.lymphedemaLineList, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    wards.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    wards.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    wards.belongsTo(models.corporations, {
      foreignKey: "corporationId",
      allowNull: false,
      constraints: false
    });
    wards.belongsTo(models.zones, {
      foreignKey: "zoneId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.facilities, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.subCenters, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.postMDAEvalList, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.tasSurvey, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.preMDAActivities, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.verticalControlFieldUnits, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    wards.hasMany(models.mdaIDACoverages, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
  };

  return wards;
};
//# sourceMappingURL=Wards.js.map
