"use strict";

module.exports = function (sequelize, DataTypes) {
  var tasSurveyChildrens = sequelize.define("tasSurveyChildrens", {
    tasSurveyId: {
      type: DataTypes.BIGINT
    },
    nameOfStudent: {
      type: DataTypes.STRING(100),
      defaultValue: 0
    },
    tockenNumber: {
      type: DataTypes.STRING(100),
      defaultValue: 0
    },
    ageYears: {
      type: DataTypes.INTEGER
    },
    ageMonths: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.INTEGER
    },
    result: {
      type: DataTypes.STRING(50)
    },
    isFamilyHistory: {
      type: DataTypes.BOOLEAN
    },
    familyHistoryRemarks: {
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

  tasSurveyChildrens.associate = function (models) {
    tasSurveyChildrens.belongsTo(models.users, {
      foreignKey: "id",
      allowNull: false,
      constraints: false
    });
    tasSurveyChildrens.belongsTo(models.tasSurvey, {
      foreignKey: "tasSurveyId",
      allowNull: false,
      constraints: false
    });
    tasSurveyChildrens.belongsTo(models.udCategoryOptions, {
      foreignKey: "result",
      as: "Result",
      allowNull: false,
      constraints: false
    });
    tasSurveyChildrens.belongsTo(models.udCategoryOptions, {
      foreignKey: "sex",
      as: "Sex",
      allowNull: false,
      constraints: false
    });
    tasSurveyChildrens.belongsTo(models.tasSurvey, {
      foreignKey: "tasSurveyId",
      allowNull: false,
      constraints: false
    });
  };

  return tasSurveyChildrens;
};
//# sourceMappingURL=tasSurveyChildrens.js.map
