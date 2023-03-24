module.exports = (sequelize, DataTypes) => {
	const postMDAEvalListPersons = sequelize.define("postMDAEvalListPersons", {
        id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		postMDAEvalListId:{
            type: DataTypes.INTEGER,
        },
		srNo: {
			type: DataTypes.STRING(50),
		},
        namePersonsEligibleForMDA: {
			type: DataTypes.STRING(50),
		},
        ageYears:{
            type: DataTypes.INTEGER,
        },
		ageMonths:{
            type: DataTypes.INTEGER,
        },
        sex:{
            type: DataTypes.INTEGER,	
        },
        noOfDECTabletsConsumed:{
            type: DataTypes.INTEGER,
			defaultValue:0
        },
        noOfDECTabletsRecovered:{
            type: DataTypes.INTEGER,
			defaultValue:0
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
	postMDAEvalListPersons.associate = (models) => {
		postMDAEvalListPersons.belongsTo(models.postMDAEvalList, {
			foreignKey: "postMDAEvalListId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return postMDAEvalListPersons;
};
