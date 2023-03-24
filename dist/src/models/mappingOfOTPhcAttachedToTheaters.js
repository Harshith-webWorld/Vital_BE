"use strict";

module.exports = function (sequelize, DataTypes) {
  var mappingOfOTPhcAttachedToTheaters = sequelize.define("mappingOfOTPhcAttachedToTheaters", {
    mappingOfOTId: {
      type: DataTypes.INTEGER
    },
    facilityId: {
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

  mappingOfOTPhcAttachedToTheaters.associate = function (models) {
    mappingOfOTPhcAttachedToTheaters.belongsTo(models.mappingOfOT, {
      foreignKey: "mappingOfOTId",
      allowNull: false,
      constraints: false,
      as: "mappingOfOTPhcAttachedToTheaters"
    });
    mappingOfOTPhcAttachedToTheaters.belongsTo(models.facilities, {
      foreignKey: "facilityId",
      sourceKey: "id",
      allowNull: false,
      constraints: false
    });
  };

  return mappingOfOTPhcAttachedToTheaters;
};
//# sourceMappingURL=mappingOfOTPhcAttachedToTheaters.js.map
