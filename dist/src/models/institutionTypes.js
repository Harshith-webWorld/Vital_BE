"use strict";

module.exports = function (sequelize, DataTypes) {
  var institutionTypes = sequelize.define("institutionTypes", {
    institutionTypeName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    institutionTypeShortName: {
      type: DataTypes.STRING(100),
      allowNull: false
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

  institutionTypes.associate = function (models) {
    institutionTypes.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    institutionTypes.hasMany(models.users, {
      foreignKey: "institutionTypeId",
      allowNull: false,
      constraints: false
    });
  };

  return institutionTypes;
};
//# sourceMappingURL=institutionTypes.js.map
