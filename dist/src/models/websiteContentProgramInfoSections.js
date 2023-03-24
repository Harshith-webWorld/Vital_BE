"use strict";

module.exports = function (sequelize, DataTypes) {
  var websiteContentProgramInfoSections = sequelize.define("websiteContentProgramInfoSections", {
    programInfoId: {
      type: DataTypes.INTEGER
    },
    displayOrder: {
      type: DataTypes.INTEGER
    },
    programInfoSectionName: {
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

  websiteContentProgramInfoSections.associate = function (models) {
    websiteContentProgramInfoSections.belongsTo(models.websiteContentProgramInfos, {
      foreignKey: "programInfoId",
      allowNull: false,
      constraints: false
    });
    websiteContentProgramInfoSections.hasMany(models.websiteContentProgramInfoLinks, {
      foreignKey: "programInfoSectionId",
      allowNull: false,
      constraints: false
    });
  };

  return websiteContentProgramInfoSections;
};
//# sourceMappingURL=websiteContentProgramInfoSections.js.map
