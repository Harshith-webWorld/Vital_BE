"use strict";

module.exports = function (sequelize, DataTypes) {
  var websiteContentAlert = sequelize.define("websiteContentAlert", {
    alert: {
      type: DataTypes.STRING(500)
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

  websiteContentAlert.associate = function (models) {
    websiteContentAlert.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
  };

  return websiteContentAlert;
};
//# sourceMappingURL=websitecontent-alert.js.map
