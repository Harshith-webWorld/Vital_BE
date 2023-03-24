"use strict";

module.exports = function (sequelize, DataTypes) {
  var activities = sequelize.define("activities", {
    activityName: {
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

  activities.associate = function (models) {
    activities.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    activities.hasMany(models.userRoleScreenActivities, {
      foreignKey: "activitiId",
      allowNull: false,
      constraints: false
    });
  };

  return activities;
};
//# sourceMappingURL=activities.js.map
