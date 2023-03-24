"use strict";

module.exports = function (sequelize, DataTypes) {
  var userRoleScreenActivities = sequelize.define("userRoleScreenActivities", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    screenId: {
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

  userRoleScreenActivities.associate = function (models) {
    userRoleScreenActivities.belongsTo(models.users, {
      foreignKey: "userId",
      allowNull: false,
      constraints: false
    });
    userRoleScreenActivities.belongsTo(models.activities, {
      foreignKey: "activitiId",
      allowNull: false,
      constraints: false
    });
    userRoleScreenActivities.belongsTo(models.roles, {
      foreignKey: "roleId",
      allowNull: false,
      constraints: false
    });
    userRoleScreenActivities.belongsTo(models.screens, {
      foreignKey: "screenId",
      allowNull: false,
      constraints: false
    });
  };

  return userRoleScreenActivities;
};
//# sourceMappingURL=userRoleScreenActivities.js.map
