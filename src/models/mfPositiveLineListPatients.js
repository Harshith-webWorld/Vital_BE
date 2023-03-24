module.exports = (sequelize, DataTypes) => {
	const mfPositiveLineListPatients = sequelize.define(
		"mfPositiveLineListPatients",
		{
			mfPositiveLineListId: {
				type: DataTypes.BIGINT,
			},
			patientId: {
				type: DataTypes.STRING(50),
			},
			bsNumber: {
				type: DataTypes.STRING(50),
			},
			patientName: {
				type: DataTypes.STRING(50),
			},
			patientRegistrationDate: {
				type: DataTypes.DATEONLY
			},
			headOfFamily: {
				type: DataTypes.STRING(50),
			},
			ageYears: {
				type: DataTypes.INTEGER,
			},
			ageMonths: {
				type: DataTypes.INTEGER,
			},
			gender: {
				type: DataTypes.INTEGER,
			},
			patientPhoneNo: {
				type: DataTypes.STRING(20),
			},
			dateOfCollection: {
				type: DataTypes.DATEONLY,
			},
			dateOfExamination: {
				type: DataTypes.DATEONLY,
			},
			nameOfEU: {
				type: DataTypes.STRING(50),
			},
			nameOfEA: {
				type: DataTypes.STRING(50),
			},
			nameOfSchool: {
				type: DataTypes.STRING(50),
			},
			isMigrationHistory: {
				type: DataTypes.BOOLEAN,
			},
			nameOfVillagTown: {
				type: DataTypes.STRING(50),
			},
			nameOfDistrictState: {
				type: DataTypes.STRING(50),
			},
			ageFromYears: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			ageFromMonths: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			ageFromDays: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			ageToYears: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			ageToMonths: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			ageToDays: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			mfCount: {
				type: DataTypes.INTEGER,
			},
			isTreatmentGive: {
				type: DataTypes.BOOLEAN,
			},
			noOfDECTabletsGiven: {
				type: DataTypes.INTEGER,
			},
			dateOfTreatmentStarted: {
				type: DataTypes.DATEONLY,
			},
			reasonsForNonTreating: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			reasonOthers: {
				type: DataTypes.STRING(100),
			},
			nameOfDrugAdmin: {
				type: DataTypes.STRING(50),
			},
			designation: {
				type: DataTypes.STRING(50),
			},
			phoneNoOfDrugAdmin: {
				type: DataTypes.STRING(20),
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
	mfPositiveLineListPatients.associate = (models) => {
		mfPositiveLineListPatients.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		mfPositiveLineListPatients.belongsTo(models.mfPositiveLineList, {
			foreignKey: "mfPositiveLineListId",
			allowNull: false,
			constraints: false,
		});
		mfPositiveLineListPatients.belongsTo(models.udCategoryOptions, {
			foreignKey: "gender",
			as: "Gender",
			allowNull: false,
			constraints: false,
		});
		mfPositiveLineListPatients.belongsTo(models.udCategoryOptions, {
			foreignKey: "gender",
			as: "Gender1",
			allowNull: false,
			constraints: false,
		});
		mfPositiveLineListPatients.belongsTo(models.udCategoryOptions, {
			foreignKey: "reasonsForNonTreating",
			as: "ReasonsForNonTreating",
			allowNull: false,
			constraints: false,
		});
		mfPositiveLineListPatients.hasMany(
			models.mfPositiveLineListBSFollowUps,
			{
				foreignKey: "mfPositiveLineListPatientId",
				allowNull: false,
				constraints: false,
			}
		);
	};

	return mfPositiveLineListPatients;
};
