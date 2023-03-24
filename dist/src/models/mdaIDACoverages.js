"use strict";

module.exports = function (sequelize, DataTypes) {
  var mdaIDACoverages = sequelize.define("mdaIDACoverages", {
    // mdaIDACoveragesOfflineId:{
    // 	type: DataTypes.STRING(50),
    // },
    srNo: {
      type: DataTypes.STRING(50)
    },
    districtId: {
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
    corporationId: {
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
    wardId: {
      type: DataTypes.INTEGER
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
    area: {
      type: DataTypes.STRING(50)
    },
    totalPopulation: {
      type: DataTypes.INTEGER
    },
    eligiblePopulation: {
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

  mdaIDACoverages.associate = function (models) {
    mdaIDACoverages.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.talukas, {
      foreignKey: "talukaId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.villages, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.wards, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.subCenters, {
      foreignKey: "subCenterId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.zones, {
      foreignKey: "zoneId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.corporations, {
      foreignKey: "corporationId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.hasMany(models.mdaIDACoverageRegularList, {
      foreignKey: "mdaIDACoverageId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.hasMany(models.mdaIDACoverageMopUpList, {
      foreignKey: "mdaIDACoverageId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.hasMany(models.mdaIDACoverageOthersList, {
      foreignKey: "mdaIDACoverageId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverages.belongsTo(models.facilities, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
  };

  return mdaIDACoverages;
};
//# sourceMappingURL=mdaIDACoverages.js.map
