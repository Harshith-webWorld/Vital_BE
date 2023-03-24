"use strict";

module.exports = function (sequelize, DataTypes) {
  var websiteContentOthersSections = sequelize.define("websiteContentOthersSections", {
    otherMenuId: {
      type: DataTypes.INTEGER
    },
    displayOrder: {
      type: DataTypes.INTEGER
    },
    menuSectionName: {
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

  websiteContentOthersSections.associate = function (models) {
    websiteContentOthersSections.belongsTo(models.websiteContentOthers, {
      foreignKey: "otherMenuId",
      allowNull: false,
      constraints: false
    });
    websiteContentOthersSections.hasMany(models.websiteContentOthersLinks, {
      foreignKey: "otherMenuSectionId",
      allowNull: false,
      constraints: false
    });
  };

  return websiteContentOthersSections;
};
//# sourceMappingURL=websiteContentOthersSections.js.map
