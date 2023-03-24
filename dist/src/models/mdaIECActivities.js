"use strict";

module.exports = function (sequelize, DataTypes) {
  var mdaIECActivities = sequelize.define("mdaIECActivities", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
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
    materialActivity: {
      type: DataTypes.INTEGER
    },
    otherMaterial: {
      type: DataTypes.STRING(100)
    },
    materialActivityNo: {
      type: DataTypes.INTEGER
    },
    materialActivityCostInRs: {
      type: DataTypes.DECIMAL(10, 2)
    },
    statementOfFundsAllotted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dateDistrictCoordComitte: {
      type: DataTypes.DATEONLY
    },
    fundAllocatedWithDate: {
      type: DataTypes.DECIMAL(10, 2)
    },
    fundUtilisedWithDate: {
      type: DataTypes.DECIMAL(10, 2)
    },
    fundBalanceAfterRound: {
      type: DataTypes.DECIMAL(10, 2)
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

  mdaIECActivities.associate = function (models) {
    mdaIECActivities.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    mdaIECActivities.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    mdaIECActivities.belongsTo(models.udCategoryOptions, {
      foreignKey: "materialActivity",
      as: "MaterialActivity",
      allowNull: false,
      constraints: false
    });
    mdaIECActivities.belongsTo(models.udCategoryOptions, {
      foreignKey: "statementOfFundsAllotted",
      as: "StatementOfFundsAllotted",
      allowNull: false,
      constraints: false
    });
  };

  return mdaIECActivities;
};
//# sourceMappingURL=mdaIECActivities.js.map
