"use strict";

module.exports = function (sequelize, DataTypes) {
  var mdaIDACoverageMopUpList = sequelize.define("mdaIDACoverageMopUpList", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    mdaIDACoverageId: {
      type: DataTypes.BIGINT
    },
    mopUp: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    noOfPeopleAdministered: {
      type: DataTypes.INTEGER
    },
    noOfPersonsWithFever: {
      type: DataTypes.INTEGER
    },
    noOfPersonsWithHeadache: {
      type: DataTypes.INTEGER
    },
    noOfPersonsWithBodyache: {
      type: DataTypes.INTEGER
    },
    noOfPersonsWithNausea: {
      type: DataTypes.INTEGER
    },
    noOfPersonsWithVomiting: {
      type: DataTypes.INTEGER
    },
    noOfPersonsRecovered: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    noOfPersonsNotRecovered: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isRequiredHospitalStay: {
      type: DataTypes.BOOLEAN
    },
    noOfPersonsRequiredHospitalStay: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    remarks: {
      type: DataTypes.STRING(250)
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

  mdaIDACoverageMopUpList.associate = function (models) {
    mdaIDACoverageMopUpList.belongsTo(models.mdaIDACoverages, {
      foreignKey: "mdaIDACoverageId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverageMopUpList.hasMany(models.mdaIDACoverageOthersList, {
      foreignKey: "mdaIDACoverageMopUpListId",
      allowNull: false,
      constraints: false
    });
  };

  return mdaIDACoverageMopUpList;
};
//# sourceMappingURL=mdaIDACoverageMopUpList.js.map
