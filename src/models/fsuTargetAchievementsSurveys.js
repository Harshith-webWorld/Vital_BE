module.exports = (sequelize, DataTypes) => {
	const fsuTargetAchievementsSurveys = sequelize.define("fsuTargetAchievementsSurveys", {
		fsuTargetAchievementId : {
			type: DataTypes.BIGINT,
		},
		namesOfVillagesOrTowns : {
			type: DataTypes.STRING(250),
		},
		targetedPopulation : {
			type: DataTypes.INTEGER,
		},
		surveyedPopulation: {
			type: DataTypes.INTEGER,
		},
		noOfBSCollected: {
			type: DataTypes.INTEGER,
		},
		noOfBSExamined: {
			type: DataTypes.INTEGER,
		},
		noOfMFPositiveCases: {
			type: DataTypes.INTEGER,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		createdBy: {
			type: DataTypes.INTEGER,
		},
        lastModifiedBy: {
			type: DataTypes.INTEGER,
		},
	});
	fsuTargetAchievementsSurveys.associate = (models) => {
		fsuTargetAchievementsSurveys.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		fsuTargetAchievementsSurveys.belongsTo(models.fsuTargetAchivements, {
			foreignKey: "fsuTargetAchievementId",
			allowNull: false,
			constraints: false,
		});
	};

	return fsuTargetAchievementsSurveys;
};
