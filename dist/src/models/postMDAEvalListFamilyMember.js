"use strict";

module.exports = function (sequelize, DataTypes) {
  var postMDAEvalListFMembers = sequelize.define("postMDAEvalListFMembers", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    postMDAEvalListId: {
      type: DataTypes.INTEGER
    },
    srNo: {
      type: DataTypes.STRING(50)
    },
    nameOfPatient: {
      type: DataTypes.STRING(50)
    },
    ageYears: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ageMonths: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    elephantitisOrHydrocele: {
      type: DataTypes.STRING(250)
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

  postMDAEvalListFMembers.associate = function (models) {
    postMDAEvalListFMembers.belongsTo(models.postMDAEvalList, {
      foreignKey: "postMDAEvalListId",
      allowNull: false,
      constraints: false
    });
  };

  return postMDAEvalListFMembers;
};
//# sourceMappingURL=postMDAEvalListFamilyMember.js.map
