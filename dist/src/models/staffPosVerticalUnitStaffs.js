"use strict";

module.exports = function (sequelize, DataTypes) {
  var staffPosVerticalUnitStaffs = sequelize.define("staffPosVerticalUnitStaffs", {
    staffPosVerticalUnitId: {
      type: DataTypes.INTEGER
    },
    nameOfStaff: {
      type: DataTypes.STRING(100)
    },
    designationId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    designationOther: {
      type: DataTypes.STRING(100)
    },
    isTrained: {
      type: DataTypes.BOOLEAN
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

  staffPosVerticalUnitStaffs.associate = function (models) {
    staffPosVerticalUnitStaffs.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnitStaffs.belongsTo(models.staffPosVerticalUnits, {
      foreignKey: "staffPosVerticalUnitId",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnitStaffs.hasMany(models.staffPosVerticalUnitTrainingStatus, {
      foreignKey: "staffPosVerticalUnitStaffId",
      allowNull: false,
      constraints: false
    });
    staffPosVerticalUnitStaffs.belongsTo(models.designations, {
      foreignKey: "designationId",
      as: "Designation",
      allowNull: false,
      constraints: false
    });
  };

  return staffPosVerticalUnitStaffs;
};
//# sourceMappingURL=staffPosVerticalUnitStaffs.js.map
