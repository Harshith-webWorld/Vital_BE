module.exports = (sequelize, DataTypes) => {
	const fsuTargetAchivements = sequelize.define("fsuTargetAchivements", {
        srNo: {
			type: DataTypes.STRING(50),
		},
		nameOfFilariaSurveyUnit: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		year: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		month: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		districtId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		facilityId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		noOfVillagesOrTowns : {
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
	fsuTargetAchivements.associate = (models) => {
		fsuTargetAchivements.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		fsuTargetAchivements.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		fsuTargetAchivements.belongsTo(models.facilities, {
			foreignKey: "facilityId",
			allowNull: false,
			constraints: false,
		});
		fsuTargetAchivements.hasMany(models.fsuTargetAchievementsSurveys, {
			foreignKey: "fsuTargetAchievementId",
			allowNull: false,
			constraints: false,
		});
		fsuTargetAchivements.belongsTo(models.verticalControlUnits, {
			foreignKey: "nameOfFilariaSurveyUnit",
			allowNull: false,
			constraints: false
		});
	};

	return fsuTargetAchivements;
};
