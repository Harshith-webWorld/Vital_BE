"use strict";

module.exports = function (sequelize, DataTypes) {
  var screensnew = sequelize.define("screensnew", {
    screenCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    screenName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    urlPath: {
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

  screensnew.associate = function (models) {
    screensnew.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    screensnew.hasMany(models.userRoleScreenActivities, {
      foreignKey: "screenId",
      allowNull: false,
      constraints: false
    });
  };

  return screensnew;
};
//# sourceMappingURL=screensnew.js.map
