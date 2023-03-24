"use strict";

module.exports = function (sequelize, DataTypes) {
  var websiteContentNews = sequelize.define("websiteContentNews", {
    newsHeader: {
      type: DataTypes.STRING(500)
    },
    newsDescriptionShortHTML: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 1000],
          msg: "Maximum characters are 1000"
        }
      }
    },
    newsDescriptionLongHTML: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 3000],
          msg: "Maximum characters are 3000"
        }
      }
    },
    newsImageName: {
      type: DataTypes.STRING(500)
    },
    newsVideoName: {
      type: DataTypes.STRING(500)
    },
    isVideoContent: {
      type: DataTypes.BOOLEAN
    },
    IsNewsPaperCutting: {
      type: DataTypes.BOOLEAN
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

  websiteContentNews.associate = function (models) {
    websiteContentNews.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
  };

  return websiteContentNews;
};
//# sourceMappingURL=websitecontent-news.js.map
