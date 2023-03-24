module.exports = (sequelize, DataTypes) => {
	const lymphedemaLineListFollowUpsLF = sequelize.define(
		"lymphedemaLineListFollowUpsLF",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			lymphedemaLineListId: {
				type: DataTypes.BIGINT
			},
			serviceProviderName: {
				type: DataTypes.STRING(100),
			},
			serviceProviderDesignation: {
				type: DataTypes.STRING(100),
			},
			serviceProviderPlace: {
				type: DataTypes.STRING(100),
			},
			serviceProviderPhone: {
				type: DataTypes.STRING(100),
			},
			serviceDateOfVisit: {
				type: DataTypes.DATEONLY,
			},
			isServiceMMDPTrainingGiven: {
				type: DataTypes.BOOLEAN,
			},
			serviceMMDPTrainingDate: {
				type: DataTypes.DATEONLY,
			},
			isServicePatientFollowingMM: {
				type: DataTypes.BOOLEAN,
			},
			servicePatientFollowingDate: {
				type: DataTypes.DATEONLY,
			},
			isServiceMMDPKitGiven: {
				type: DataTypes.BOOLEAN,
			},
			serviceMMDPKitGivenDate: {
				type: DataTypes.DATEONLY,
			},
			isServiceMedicineGiven : {
				type: DataTypes.BOOLEAN,
			},
			serviceMedicineGivenDate: {
				type: DataTypes.DATEONLY,
			},
			followUpLostReasonsId: {
				type: DataTypes.INTEGER,
				defaultValue:0
			},
			followUpLostDateOfDeath: {
				type: DataTypes.DATEONLY,
			},
			followUpLostPlaceOfMigration: {
				type: DataTypes.STRING(100),
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

	lymphedemaLineListFollowUpsLF.associate = (models) => {
		lymphedemaLineListFollowUpsLF.belongsTo(
			models.lymphedemaLineList,
			{
				foreignKey: "lymphedemaLineListId",
				allowNull: false,
				constraints: false
			}
		);
		lymphedemaLineListFollowUpsLF.belongsTo(models.udCategoryOptions, {
			foreignKey: "followUpLostReasonsId",
			as:"FollowUpLostReasonsId",
			allowNull: false,
			constraints: false
		});
		
	};

	return lymphedemaLineListFollowUpsLF;
};
