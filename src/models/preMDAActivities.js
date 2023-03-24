module.exports = (sequelize, DataTypes) => {
	const preMDAActivities = sequelize.define("preMDAActivities", {
		srNo: {
			type: DataTypes.STRING,
		},
		districtId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		corporationId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		talukaId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		zoneId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		facilityId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		subCenterId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		wardId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		villageId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		area: {
			type: DataTypes.STRING(50),
		},
		year: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		month: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		totalPopulationVillage: {
			type: DataTypes.INTEGER,
		},
		totalStaffSanctioned: {
			type: DataTypes.INTEGER,
		},
		totalStaffsUnit: {
			type: DataTypes.INTEGER,
		},
		totalManDaysRequired: {
			type: DataTypes.INTEGER,
		},
		requiredDrugAdmin: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		otherDrugAdministrator: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
		otherSupervisor: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
		actualAvailableDrugAdmin: {
			type: DataTypes.INTEGER,
		},
		requiredSupervisors: {
			type: DataTypes.INTEGER,
		},
		actualAvailableSupervisor: {
			type: DataTypes.INTEGER,
		},
		numberTrainedForMMDP: {
			type: DataTypes.INTEGER,
		},
		batchesOfTrainingOrganizedMMDP: {
			type: DataTypes.INTEGER,
		},
		numberTrainedForMDAIDA: {
			type: DataTypes.INTEGER,
		},
		batchesOfTrainingOrganizedMDAIDA: {
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
	preMDAActivities.associate = (models) => {
		preMDAActivities.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.zones, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.facilities, {
			foreignKey: "facilityId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.subCenters, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.villages, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.belongsTo(models.wards, {
			foreignKey: "wardId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.hasMany(models.preMDAActivityDrugLogistics, {
			foreignKey: "preMDAActivityId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.hasMany(models.preMDAActivityDrugAdministrators, {
			foreignKey: "preMDAActivityId",
			allowNull: false,
			constraints: false,
		});
		preMDAActivities.hasMany(models.preMDAActivitySupervisors, {
			foreignKey: "preMDAActivityId",
			allowNull: false,
			constraints: false,
		});
	};

	return preMDAActivities;
};
