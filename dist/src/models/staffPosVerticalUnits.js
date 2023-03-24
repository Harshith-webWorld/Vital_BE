"use strict";

module.exports = function (sequelize, DataTypes) {
  var staffPosVerticalUnits = sequelize.define("staffPosVerticalUnits", {
    srNo: {
      type: DataTypes.STRING(50)
    },
    stateId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    districtId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    month: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    typeOfUnit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nameOfUnit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cadre: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cadreOther: {
      type: DataTypes.INTEGER
    },
    sanctioned: {
      type: DataTypes.INTEGER
    },
    filled: {
      type: DataTypes.INTEGER
    },
    vacant: {
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

  staffPosVerticalUnits.associate = function (models) {
    staffPosVerticalUnits.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnits.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnits.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnits.belongsTo(models.udCategoryOptions, {
      foreignKey: "typeOfUnit",
      as: "TypeOfUnit2",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnits.belongsTo(models.verticalControlUnits, {
      foreignKey: "nameOfUnit",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnits.hasMany(models.staffPosVerticalUnitStaffs, {
      foreignKey: "staffPosVerticalUnitId",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnits.belongsTo(models.udCategoryOptions, {
      foreignKey: "cadre",
      as: "Cadre2",
      allowNull: false,
      constraints: false
    });
  };

  return staffPosVerticalUnits;
};
//# sourceMappingURL=staffPosVerticalUnits.js.map
