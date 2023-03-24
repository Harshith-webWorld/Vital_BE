"use strict";

module.exports = function (sequelize, DataTypes) {
  var entomologicalDataCounts = sequelize.define("entomologicalDataCounts", {
    entomologicalLarvicidalListId: {
      type: DataTypes.BIGINT
    },
    mosquitoTypeId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    noOfMosquitoCollectedMale: {
      type: DataTypes.INTEGER
    },
    noOfMosquitoCollectedFemale: {
      type: DataTypes.INTEGER
    },
    noOfMosquitoCollectedTotal: {
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

  entomologicalDataCounts.associate = function (models) {
    entomologicalDataCounts.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    entomologicalDataCounts.belongsTo(models.entomologicalLarvicidalList, {
      foreignKey: "entomologicalLarvicidalListId",
      allowNull: false,
      constraints: false
    });
  };

  return entomologicalDataCounts;
};
//# sourceMappingURL=entomologicalDataCounts.js.map
