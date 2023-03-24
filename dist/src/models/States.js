"use strict";

module.exports = function (sequelize, DataTypes) {
  var states = sequelize.define("states", {
    stateName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stateCode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING(50),
      allowNull: false
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

  states.associate = function (models) {
    states.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.districts, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.talukas, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.villages, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.corporations, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.zones, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.wards, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.facilities, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.subCenters, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.postMDAEvalList, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.tasSurvey, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.verticalUnitStockPositions, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.verticalControlUnits, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    states.hasMany(models.verticalControlFieldUnits, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
  };

  return states;
};
//# sourceMappingURL=States.js.map
