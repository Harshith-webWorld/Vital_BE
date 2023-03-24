"use strict";

module.exports = function (sequelize, DataTypes) {
  var verticalUnitStockPositions = sequelize.define("verticalUnitStockPositions", {
    srNo: {
      type: DataTypes.STRING(50)
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    month: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stateId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    districtId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    unitType: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    unitName: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    items: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    otherItem: {
      type: DataTypes.STRING(100)
    },
    measurement: {
      type: DataTypes.STRING(50)
    },
    openingBalanceBatchNo: {
      type: DataTypes.STRING(250)
    },
    openingBalanceMFDate: {
      type: DataTypes.DATEONLY
    },
    openingBalanceExpiryDate: {
      type: DataTypes.DATEONLY
    },
    openingBalanceQty: {
      type: DataTypes.INTEGER
    },
    receivedDuringMonthBatchNo: {
      type: DataTypes.STRING(250)
    },
    receivedDuringMonthMFDate: {
      type: DataTypes.DATEONLY
    },
    receivedDuringMonthExpiryDate: {
      type: DataTypes.DATEONLY
    },
    receivedDuringMonthQty: {
      type: DataTypes.INTEGER
    },
    receivedFromWhom: {
      type: DataTypes.STRING(50)
    },
    receivedFromDistricts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    receivedFromWhomOthers: {
      type: DataTypes.STRING(50)
    },
    totalStock: {
      type: DataTypes.INTEGER
    },
    actualConsumption: {
      type: DataTypes.INTEGER
    },
    issueToOtherBatchNo: {
      type: DataTypes.STRING(50)
    },
    issueToOtherMFDate: {
      type: DataTypes.DATEONLY
    },
    issueToOtherExpiryDate: {
      type: DataTypes.DATEONLY
    },
    issueToOtherQty: {
      type: DataTypes.INTEGER
    },
    issuedToWhom: {
      type: DataTypes.STRING(50)
    },
    balanceEndOfMonth: {
      type: DataTypes.INTEGER
    },
    reqNext3MonthsQty: {
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

  verticalUnitStockPositions.associate = function (models) {
    verticalUnitStockPositions.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    verticalUnitStockPositions.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    verticalUnitStockPositions.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    verticalUnitStockPositions.belongsTo(models.udCategoryOptions, {
      foreignKey: "unit",
      as: "verticalUnit",
      allowNull: false,
      constraints: false
    });
    verticalUnitStockPositions.belongsTo(models.udCategoryOptions, {
      foreignKey: "items",
      as: "tabletName",
      allowNull: false,
      constraints: false
    });
    verticalUnitStockPositions.belongsTo(models.udCategoryOptions, {
      foreignKey: "unitType",
      as: "UnitType",
      allowNull: false,
      constraints: false
    });
    verticalUnitStockPositions.belongsTo(models.verticalControlUnits, {
      foreignKey: "unitName",
      allowNull: false,
      constraints: false
    });
  };

  return verticalUnitStockPositions;
};
//# sourceMappingURL=verticalUnitStockPositions.js.map
