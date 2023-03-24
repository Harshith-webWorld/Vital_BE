"use strict";

module.exports = function (sequelize, DataTypes) {
  var mappingOfOT = sequelize.define("mappingOfOT", {
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
    nameOfInstitutionOT: {
      type: DataTypes.STRING(250)
    },
    govtOrPrivate: {
      type: DataTypes.STRING(20)
    },
    privateHospitalName: {
      type: DataTypes.STRING(250)
    },
    noOfAvailableSurgeons: {
      type: DataTypes.INTEGER
    },
    noOfAvailableAnaesthetist: {
      type: DataTypes.INTEGER
    },
    // nameOfPHCAttachedToOT : {
    // 	type: DataTypes.INTEGER,
    // 	defaultValue:0
    // },
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

  mappingOfOT.associate = function (models) {
    mappingOfOT.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    mappingOfOT.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    mappingOfOT.belongsTo(models.corporations, {
      foreignKey: "corporationId",
      allowNull: false,
      constraints: false
    });
    mappingOfOT.belongsTo(models.talukas, {
      foreignKey: "talukaId",
      allowNull: false,
      constraints: false
    }); // mappingOfOT.belongsTo(models.facilities, {
    // 	foreignKey: "nameOfPHCAttachedToOT",
    // 	allowNull: false,
    // 	constraints: false,
    // });

    mappingOfOT.hasMany(models.mappingOfOTSurgeons, {
      foreignKey: "mappingOfOTId",
      allowNull: false,
      constraints: false
    });
    mappingOfOT.hasMany(models.mappingOfOTPhcAttachedToTheaters, {
      // as: "mappingOfOTPhcAttachedToTheaters",
      foreignKey: "mappingOfOTId",
      allowNull: false,
      constraints: false
    });
  };

  return mappingOfOT;
};
//# sourceMappingURL=mappingOfOT.js.map
