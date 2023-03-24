"use strict";

module.exports = function (sequelize, DataTypes) {
  var preMDAActivitySupervisors = sequelize.define("preMDAActivitySupervisors", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    preMDAActivityId: {
      type: DataTypes.BIGINT
    },
    cadreOfSupervisorId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    otherDrugSupervisor: {
      type: DataTypes.STRING(200)
    },
    noOfSupervisor: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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

  preMDAActivitySupervisors.associate = function (models) {
    preMDAActivitySupervisors.belongsTo(models.preMDAActivities, {
      foreignKey: "preMDAActivityId",
      allowNull: false,
      constraints: false
    });
  };

  return preMDAActivitySupervisors;
};
//# sourceMappingURL=preMDAActivitySupervisors.js.map
