"use strict";

module.exports = function (sequelize, DataTypes) {
  var websiteContentOthersLinks = sequelize.define("websiteContentOthersLinks", {
    otherMenuId: {
      type: DataTypes.INTEGER
    },
    otherMenuSectionId: {
      type: DataTypes.INTEGER
    },
    displayOrder: {
      type: DataTypes.INTEGER
    },
    linkName: {
      type: DataTypes.STRING(500)
    },
    linkFileName: {
      type: DataTypes.STRING(500)
    },
    linkFileType: {
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

  websiteContentOthersLinks.associate = function (models) {
    websiteContentOthersLinks.belongsTo(models.websiteContentOthers, {
      foreignKey: "otherMenuId",
      allowNull: false,
      constraints: false
    });
    websiteContentOthersLinks.belongsTo(models.websiteContentOthersSections, {
      foreignKey: "otherMenuSectionId",
      allowNull: false,
      constraints: false
    });
  };

  return websiteContentOthersLinks;
};
//# sourceMappingURL=websiteContentOthersLinks.js.map
