"use strict";

module.exports = function (sequelize, DataTypes) {
  var mfPositiveLineListBSFollowUps = sequelize.define("mfPositiveLineListBSFollowUps", {
    mfPositiveLineListId: {
      type: DataTypes.BIGINT
    },
    mfPositiveLineListPatientId: {
      type: DataTypes.BIGINT
    },
    followUpYear: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    followUpDate: {
      type: DataTypes.DATEONLY
    },
    result: {
      type: DataTypes.STRING(100)
    },
    noOfDECTabletsGiven: {
      type: DataTypes.INTEGER
    },
    noOfDECTabletsConsumed: {
      type: DataTypes.INTEGER
    },
    nameOfDrugAdmin: {
      type: DataTypes.STRING(50)
    },
    designation: {
      type: DataTypes.STRING(50)
    },
    phoneNoOfDrugAdmin: {
      type: DataTypes.STRING(50)
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

  mfPositiveLineListBSFollowUps.associate = function (models) {
    mfPositiveLineListBSFollowUps.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineListBSFollowUps.belongsTo(models.mfPositiveLineList, {
      foreignKey: "mfPositiveLineListId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineListBSFollowUps.belongsTo(models.mfPositiveLineListPatients, {
      foreignKey: "mfPositiveLineListPatientId",
      allowNull: false,
      constraints: false
    });
  };

  return mfPositiveLineListBSFollowUps;
};
//# sourceMappingURL=mfPositiveLineListBSFollowUps.js.map
