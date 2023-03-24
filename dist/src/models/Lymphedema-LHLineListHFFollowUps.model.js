"use strict";

module.exports = function (Sequelize, DataTypes) {
  var lymphedemaLineListFollowUpsHF = Sequelize.define("lymphedemaLineListFollowUpsHF", {
    // ****  hydrocele FollowUps  **** //
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    lymphedemaLineListId: {
      type: DataTypes.BIGINT
    },
    serviceProviderName: {
      type: DataTypes.STRING(100)
    },
    serviceProviderDesignation: {
      type: DataTypes.STRING(100)
    },
    serviceProviderPlace: {
      type: DataTypes.STRING(100)
    },
    serviceProviderPhone: {
      type: DataTypes.STRING(100)
    },
    isAnyComorbidity: {
      type: DataTypes.BOOLEAN
    },
    comorbidityType: {
      type: DataTypes.STRING(100)
    },
    otherComorbidity: {
      type: DataTypes.STRING(100)
    },
    isSurgeryDone: {
      type: DataTypes.BOOLEAN
    },
    dateOfSurgery: {
      type: DataTypes.DATEONLY
    },
    nameOfSurgeon: {
      type: DataTypes.STRING(100)
    },
    surgeonPhone: {
      type: DataTypes.STRING(100)
    },
    nameOfHospitalSurgeryDoneId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    otherHospitalSurgeryDone: {
      type: DataTypes.STRING,
      "default": ''
    },
    stageOfHydrocele: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dateOfFollowUpAfterSurgery: {
      type: DataTypes.DATEONLY
    },
    findingsDuringSurgeryFollowUp: {
      type: DataTypes.STRING(250)
    },
    surgeryNotPossibleReasonsId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dateOfDeathSurgeryNotPossible: {
      type: DataTypes.DATEONLY
    },
    placeOfMigrationSurgeryNoPossible: {
      type: DataTypes.STRING(100)
    },
    reasonOthers: {
      type: DataTypes.STRING(100)
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

  lymphedemaLineListFollowUpsHF.associate = function (models) {
    lymphedemaLineListFollowUpsHF.belongsTo(models.lymphedemaLineList, {
      foreignKey: "lymphedemaLineListId",
      allowNull: false,
      constraints: false
    });
    lymphedemaLineListFollowUpsHF.belongsTo(models.udCategoryOptions, {
      foreignKey: "surgeryNotPossibleReasonsId",
      as: "SurgeryNotPossibleReasonsId",
      allowNull: false,
      constraints: false
    });
    lymphedemaLineListFollowUpsHF.belongsTo(models.facilities, {
      foreignKey: "nameOfHospitalSurgeryDoneId",
      as: "NameOfHospitalSurgeryDoneId",
      allowNull: false,
      constraints: false
    });
  };

  return lymphedemaLineListFollowUpsHF;
};
//# sourceMappingURL=Lymphedema-LHLineListHFFollowUps.model.js.map
