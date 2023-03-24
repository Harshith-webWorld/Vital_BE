module.exports = (sequelize, DataTypes) => {
	const preMDAActivityDrugAdministrators = sequelize.define("preMDAActivityDrugAdministrators", {
        id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		preMDAActivityId:{
            type: DataTypes.BIGINT
        },
        cadreOfDrugAdminId:{
            type: DataTypes.INTEGER,
			defaultValue:0
        },
        otherDrugAdministrator:{
            type: DataTypes.STRING(200),
        },
		noOfDrugAdministrator:{
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
	preMDAActivityDrugAdministrators.associate = (models) => {
		preMDAActivityDrugAdministrators.belongsTo(models.preMDAActivities, {
			foreignKey: "preMDAActivityId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return preMDAActivityDrugAdministrators;
};
