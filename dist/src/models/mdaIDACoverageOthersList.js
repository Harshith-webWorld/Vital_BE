"use strict";

module.exports = function (sequelize, DataTypes) {
  var mdaIDACoverageOthersList = sequelize.define("mdaIDACoverageOthersList", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    mdaIDACoverageId: {
      type: DataTypes.BIGINT
    },
    mdaIDACoverageRegularListId: {
      type: DataTypes.BIGINT
    },
    mdaIDACoverageMopUpListId: {
      type: DataTypes.BIGINT
    },
    otherAdverseExp: {
      type: DataTypes.STRING(50)
    },
    noOfPersonsWithOtherAdverseExp: {
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

  mdaIDACoverageOthersList.associate = function (models) {
    mdaIDACoverageOthersList.belongsTo(models.mdaIDACoverages, {
      foreignKey: "mdaIDACoverageId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverageOthersList.belongsTo(models.mdaIDACoverageRegularList, {
      foreignKey: "mdaIDACoverageRegularListId",
      allowNull: false,
      constraints: false
    });
    mdaIDACoverageOthersList.belongsTo(models.mdaIDACoverageMopUpList, {
      foreignKey: "mdaIDACoverageMopUpListId",
      allowNull: false,
      constraints: false
    });
  };

  return mdaIDACoverageOthersList;
};
//# sourceMappingURL=mdaIDACoverageOthersList.js.map
