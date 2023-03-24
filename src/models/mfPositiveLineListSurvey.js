module.exports = (sequelize, DataTypes) => {
    const mfPositiveLineListSurvey = sequelize.define("mfPositiveLineListSurvey", {
      mfPositiveLineListId: {
        type: DataTypes.BIGINT,
      },
      detailsOfSurveyId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      noOfPersonsMale0to4: {
        type: DataTypes.INTEGER
      },
      noOfPersonsMale5to14: {
        type: DataTypes.INTEGER
      },
      noOfPersonsMale15to39: {
        type: DataTypes.INTEGER
      },
      noOfPersonsMale40Plus: {
        type: DataTypes.INTEGER
      },
      noOfPersonsFemale0to4: {
        type: DataTypes.INTEGER
      },
      noOfPersonsFemale5to14: {
        type: DataTypes.INTEGER
      },
      noOfPersonsFemale15to39: {
        type: DataTypes.INTEGER
      },
      noOfPersonsFemale40Plus: {
        type: DataTypes.INTEGER
      },
      noOfPersonsTG0to4: {
        type: DataTypes.INTEGER
      },
      noOfPersonsTG5to14: {
        type: DataTypes.INTEGER
      },
      noOfPersonsTG15to39: {
        type: DataTypes.INTEGER
      },
      noOfPersonsTG40Plus: {
        type: DataTypes.INTEGER
      },
      dateOfAction: {
        type: DataTypes.DATEONLY
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
      },
      createdBy: {
        type: DataTypes.INTEGER
      },
      lastModifiedBy: {
        type: DataTypes.INTEGER
      },
    });
    mfPositiveLineListSurvey.associate = (models) => {
		mfPositiveLineListSurvey.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
        mfPositiveLineListSurvey.belongsTo(models.mfPositiveLineList, {
			foreignKey: "mfPositiveLineListId",
			allowNull: false,
			constraints: false,
		});
    };
  
    return mfPositiveLineListSurvey;
  };
  