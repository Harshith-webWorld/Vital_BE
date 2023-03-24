module.exports = (sequelize, DataTypes) => {
	const lymphedemaLineListSurvey = sequelize.define(
		"lymphedemaLineListSurvey",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			lymphedemaLineListId: {
				type: DataTypes.BIGINT,
			},
			surveyDoneUnder: {
				type: DataTypes.INTEGER,
				defaultValue:0
			},
			dateOfSurvey: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			isVerified: {
				type: DataTypes.BOOLEAN,
			},
			verifiedByDoctorName: {
				type: DataTypes.STRING(100),
			},
			verifiedByDoctorPhone: {
				type: DataTypes.STRING(100),
			},
			dateOfVerification: {
				type: DataTypes.DATEONLY,
				allowNull: true
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
		}
	);

	lymphedemaLineListSurvey.associate = (models) => {
		lymphedemaLineListSurvey.belongsTo(models.lymphedemaLineList, {
			foreignKey: "lymphedemaLineListId",
			allowNull: false,
			constraints: false
		});
		lymphedemaLineListSurvey.belongsTo(models.udCategoryOptions, {
			foreignKey: "surveyDoneUnder",
			allowNull: false,
			constraints: false
		});
		
	
	};

	return lymphedemaLineListSurvey;
};
