"use strict";

module.exports = function (sequelize, DataTypes) {
  var mfPositiveLineList = sequelize.define("mfPositiveLineList", {
    srNo: {
      type: DataTypes.STRING(50)
    },
    districtId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    corporationId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    talukaId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    zoneId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    facilityId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    subCenterId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    villageId: {
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
    town: {
      type: DataTypes.STRING(50)
    },
    area: {
      type: DataTypes.STRING(50)
    },
    totalPopulationVillage: {
      type: DataTypes.INTEGER
    },
    totalNoOfHousesInArea: {
      type: DataTypes.INTEGER
    },
    unitOfAction: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nameOfUnit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bsCollectionAntigenTest: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nameOfFilariaFieldUnit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    populationCoveredByUnit: {
      type: DataTypes.INTEGER
    },
    targetForCollectionOfNBS: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    fixOrRandom: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    noOfBSFoundPositive: {
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

  mfPositiveLineList.associate = function (models) {
    mfPositiveLineList.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.corporations, {
      foreignKey: "corporationId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.talukas, {
      foreignKey: "talukaId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.zones, {
      foreignKey: "zoneId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.facilities, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.subCenters, {
      foreignKey: "subCenterId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.villages, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.verticalControlUnits, {
      foreignKey: "nameOfUnit",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.verticalControlFieldUnits, {
      foreignKey: "nameOfFilariaFieldUnit",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.hasMany(models.mfPositiveLineListSurvey, {
      foreignKey: "mfPositiveLineListId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.hasMany(models.mfPositiveLineListPatients, {
      foreignKey: "mfPositiveLineListId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.hasMany(models.mfPositiveLineListBSFollowUps, {
      foreignKey: "mfPositiveLineListId",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.udCategoryOptions, {
      foreignKey: "bsCollectionAntigenTest",
      as: "BsCollectionAntigenTest",
      allowNull: false,
      constraints: false
    });
    mfPositiveLineList.belongsTo(models.udCategoryOptions, {
      foreignKey: "unitOfAction",
      as: "UnitOfAction2",
      allowNull: false,
      constraints: false
    });
  };

  return mfPositiveLineList;
};
//# sourceMappingURL=mfPositiveLineList.js.map
