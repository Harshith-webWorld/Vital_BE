module.exports = (sequelize, DataTypes) => {
	const preMDAActivityDrugLogistics = sequelize.define(
		"preMDAActivityDrugLogistics",
		{
			preMDAActivityId: {
				type: DataTypes.INTEGER,
			},
			nameOfTablet: {
				type: DataTypes.STRING(100),
			},
			batchNumberOfTablet: {
				type: DataTypes.STRING(500),
			},
			dateOfExpiryTablet: {
				type: DataTypes.DATEONLY,
			},
			quantityTabletRquireForMDA: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			quantityTabletInStockBeforeRound: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			quantityOfTabletReceivedForRound: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			batchNoOfTabletReceivedForRound: {
				type: DataTypes.STRING(50),
			},
			dateOfExpiryTabletReceivedForRound: {
				type: DataTypes.DATEONLY,
			},
			sourceFromTabletReceivedForRound: {
				type: DataTypes.STRING(100),
			},
			sourceFromTabletReceivedForRoundDist: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			quantityOfTabletsDestroyedDuringRound: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			quantityOfBalanceTabletsInStock: {
				type: DataTypes.INTEGER,
			},
			batchNumberOfTabletInStock: {
				type: DataTypes.STRING(500),
			},
			dateOfExpiryTabletInStock: {
				type: DataTypes.DATEONLY,
			},
			reasonForTabletsDestroyed:{
				type: DataTypes.STRING(500),
			},
			batchNumberOfTabletDestroyed:{
				type: DataTypes.STRING(500),
			},
			dateOfExpiryTabletDestroyed:{
				type: DataTypes.DATEONLY,
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
	preMDAActivityDrugLogistics.associate = (models) => {
		preMDAActivityDrugLogistics.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		preMDAActivityDrugLogistics.belongsTo(models.udCategoryOptions, {
			foreignKey: "nameOfTablet",
			allowNull: false,
			constraints: false,
		});
		preMDAActivityDrugLogistics.belongsTo(models.preMDAActivities, {
			foreignKey: "preMDAActivityId",
			allowNull: false,
			constraints: false,
		});
	};

	return preMDAActivityDrugLogistics;
};
