module.exports = (sequelize, DataTypes) => {
	const villages = sequelize.define("villages", {
		villageName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		subCenterId: {
			type: DataTypes.INTEGER
		},
		facilityId: {
			type: DataTypes.INTEGER
		},
		talukaId: {
			type: DataTypes.INTEGER,
		},
		districtId: {
			type: DataTypes.INTEGER,
		},
		subCenterId: {
			type: DataTypes.INTEGER,
		},
		stateId: {
			type: DataTypes.INTEGER,
		},
		mapId: {
			type: DataTypes.STRING(10),
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
	villages.associate = (models) => {
		villages.hasMany(models.lymphedemaLineList, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.belongsTo(models.subCenters, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		villages.belongsTo(models.facilities, {
			foreignKey: "facilityId",
			allowNull: false,
			constraints: false,
		});
		villages.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		villages.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		villages.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		villages.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.subCenters, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.postMDAEvalList, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.tasSurvey, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.preMDAActivities, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.entomologicalLarvicidalList, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.mfPositiveLineList, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.verticalControlFieldUnits, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		villages.hasMany(models.mdaIDACoverages, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
	};

	return villages;
};
