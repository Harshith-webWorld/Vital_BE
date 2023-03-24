"use strict";

module.exports = function (sequelize, DataTypes) {
  var entomologicalLarvicidalList = sequelize.define("entomologicalLarvicidalList", {
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
    typeOfUnit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nameOfUnit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    districtId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    talukaId: {
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
    town: {
      type: DataTypes.STRING(50)
    },
    dateOfSurvey: {
      type: DataTypes.DATEONLY
    },
    fixedOrRandom: {
      type: DataTypes.STRING(20)
    },
    totalTimeSpentHrs: {
      type: DataTypes.INTEGER
    },
    totalTimeSpentMinutes: {
      type: DataTypes.INTEGER
    },
    mosqDissectedCulexQui: {
      type: DataTypes.INTEGER
    },
    totalNoPositiveMosq1to3Stage: {
      type: DataTypes.INTEGER
    },
    totalNoPositiveMosq3Stage: {
      type: DataTypes.INTEGER
    },
    breedingPlacesChecked: {
      type: DataTypes.STRING(100)
    },
    totalNoOfDipsTaken: {
      type: DataTypes.INTEGER
    },
    noOfPosVePlaceIIIandIVStage: {
      type: DataTypes.INTEGER
    },
    noOfPosVePlaceForPupae: {
      type: DataTypes.INTEGER
    },
    totalCulexLarvaeCount1to4Stage: {
      type: DataTypes.INTEGER
    },
    totalCulexPupaeCount: {
      type: DataTypes.INTEGER
    },
    totalAnLarvaeCount: {
      type: DataTypes.INTEGER
    },
    noOfWellsBioControl: {
      type: DataTypes.INTEGER
    },
    noOfTankBioControl: {
      type: DataTypes.INTEGER
    },
    noOfCanalsBioControl: {
      type: DataTypes.INTEGER
    },
    noOfLocGuppyIntro: {
      type: DataTypes.INTEGER
    },
    noOfPendingLocTreatment: {
      type: DataTypes.INTEGER
    },
    noOfVentPipesCovered: {
      type: DataTypes.INTEGER
    },
    larvicideNameId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    measurement: {
      type: DataTypes.STRING(50)
    },
    openingBalance: {
      type: DataTypes.DECIMAL(10, 2)
    },
    receivedDuringMonth: {
      type: DataTypes.DECIMAL(10, 2)
    },
    consumedDuringMonth: {
      type: DataTypes.DECIMAL(10, 2)
    },
    balanceEndOfMonth: {
      type: DataTypes.DECIMAL(10, 2)
    },
    noOfMenWorkingSFW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    noOfMenWorkingFW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    canalisationWork: {
      type: DataTypes.DECIMAL(10, 2)
    },
    desiltingWork: {
      type: DataTypes.DECIMAL(10, 2)
    },
    deweedingWork: {
      type: DataTypes.DECIMAL(10, 2)
    },
    fillingWork: {
      type: DataTypes.DECIMAL(10, 2)
    },
    otherWork: {
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

  entomologicalLarvicidalList.associate = function (models) {
    entomologicalLarvicidalList.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.talukas, {
      foreignKey: "talukaId",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.facilities, {
      foreignKey: "facilityId",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.subCenters, {
      foreignKey: "subCenterId",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.villages, {
      foreignKey: "villageId",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.udCategoryOptions, {
      foreignKey: "typeOfUnit",
      as: "TypeOfUnit",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.belongsTo(models.verticalControlUnits, {
      foreignKey: "nameOfUnit",
      allowNull: false,
      constraints: false
    });
    entomologicalLarvicidalList.hasMany(models.entomologicalDataCounts, {
      foreignKey: "entomologicalLarvicidalListId",
      allowNull: false,
      constraints: false
    });
  };

  return entomologicalLarvicidalList;
};
//# sourceMappingURL=entomologicalLarvicidalList.js.map
