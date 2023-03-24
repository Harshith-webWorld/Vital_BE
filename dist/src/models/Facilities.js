"use strict";

module.exports = function (sequelize, DataTypes) {
  var facilities = sequelize.define("facilities", {
    facilityName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    facilityType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    talukaId: {
      type: DataTypes.INTEGER
    },
    districtId: {
      type: DataTypes.INTEGER
    },
    stateId: {
      type: DataTypes.INTEGER
    },
    corporationId: {
      type: DataTypes.INTEGER
    },
    zoneId: {
      type: DataTypes.INTEGER
    },
    wardId: {
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

  facilities.associate = function (models) {
    facilities.hasMany(models.lymphedemaLineList, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.states, {
      foreignKey: "stateId",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.corporations, {
      foreignKey: "corporationId",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.zones, {
      foreignKey: "zoneId",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.talukas, {
      foreignKey: "talukaId",
      allowNull: false,
      constraints: false
    });
    facilities.belongsTo(models.wards, {
      foreignKey: "wardId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.subCenters, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.postMDAEvalList, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.fsuTargetAchivements, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.preMDAActivities, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.entomologicalLarvicidalList, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.mfPositiveLineList, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.mdaIDACoverages, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    facilities.hasMany(models.villages, {
      foreignKey: "facilityId"
    });
    facilities.hasMany(models.lymphedemaLineListFollowUpsHF, {
      foreignKey: "nameOfHospitalSurgeryDoneId",
      as: "NameOfHospitalSurgeryDoneId",
      allowNull: false,
      constraints: false
    });
  };

  return facilities;
};
//# sourceMappingURL=Facilities.js.map
