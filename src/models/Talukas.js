module.exports = (sequelize, DataTypes) => {
	const talukas = sequelize.define("talukas", {
		talukaName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		districtId: {
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
	talukas.associate = (models) => {
		talukas.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.lymphedemaLineList, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});

		talukas.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		talukas.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.villages, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.facilities, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.subCenters, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.postMDAEvalList, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.tasSurvey, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.preMDAActivities, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.mappingOfOT, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.entomologicalLarvicidalList, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.mfPositiveLineList, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.verticalControlUnits, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.verticalControlFieldUnits, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		talukas.hasMany(models.mdaIDACoverages, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
	};
	return talukas;
};
