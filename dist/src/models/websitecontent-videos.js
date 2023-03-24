"use strict";

module.exports = function (sequelize, DataTypes) {
  var websiteContentVideos = sequelize.define("websiteContentVideos", {
    videoName: {
      type: DataTypes.STRING(100)
    },
    thumbnailName: {
      type: DataTypes.STRING(100)
    },
    videoHeader: {
      type: DataTypes.STRING(500)
    },
    videoHtmlText: {
      type: DataTypes.STRING(1000),
      validate: {
        len: {
          args: [0, 1000],
          msg: "Maximum characters are 1000"
        }
      }
    },
    isShowPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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

  websiteContentVideos.associate = function (models) {
    websiteContentVideos.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
  };

  return websiteContentVideos;
};
//# sourceMappingURL=websitecontent-videos.js.map
