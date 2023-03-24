module.exports = (sequelize, DataTypes) => {
	const subCenters = sequelize.define("subCenters", {
		subCenterName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		facilityId: {
			type: DataTypes.INTEGER,
		},
		talukaId: {
			type: DataTypes.INTEGER,
		},
		districtId: {
			type: DataTypes.INTEGER,
		},
		stateId: {
			type: DataTypes.INTEGER,
		},
		corporationId: {
			type: DataTypes.INTEGER,
		},
		zoneId: {
			type: DataTypes.INTEGER,
		},
		wardId: {
			type: DataTypes.INTEGER,
		},
		villageId: {
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
	subCenters.associate = (models) => {
		subCenters.hasMany(models.lymphedemaLineList, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});

		subCenters.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.zones, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.wards, {
			foreignKey: "wardId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.villages, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		subCenters.belongsTo(models.facilities, {
			foreignKey: "facilityId",
			allowNull: false,
			constraints: false,
		});
		subCenters.hasMany(models.villages, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		subCenters.hasMany(models.postMDAEvalList, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		subCenters.hasMany(models.preMDAActivities, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		subCenters.hasMany(models.entomologicalLarvicidalList, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		subCenters.hasMany(models.mfPositiveLineList, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		subCenters.hasMany(models.mdaIDACoverages, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
	};

	return subCenters;
};
