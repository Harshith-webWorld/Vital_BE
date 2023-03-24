module.exports = (sequelize, DataTypes) => {
	const preMDAActivitySupervisors = sequelize.define("preMDAActivitySupervisors", {
        id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		preMDAActivityId:{
            type: DataTypes.BIGINT
        },
        cadreOfSupervisorId:{
            type: DataTypes.INTEGER,
			defaultValue:0
        },
        otherDrugSupervisor:{
            type: DataTypes.STRING(200),
        },
		noOfSupervisor:{
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
	preMDAActivitySupervisors.associate = (models) => {
		preMDAActivitySupervisors.belongsTo(models.preMDAActivities, {
			foreignKey: "preMDAActivityId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return preMDAActivitySupervisors;
};
