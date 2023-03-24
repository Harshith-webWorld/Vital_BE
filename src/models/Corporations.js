module.exports = (sequelize, DataTypes) => {
	const corporations = sequelize.define("corporations", {
		
		corporationName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		districtId: {
			type: DataTypes.INTEGER,
		},
		stateId: {
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
	corporations.associate = (models) => {
		corporations.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.lymphedemaLineList, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});

		corporations.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		corporations.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.zones, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.wards, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.facilities, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.subCenters, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.postMDAEvalList, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.tasSurvey, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.preMDAActivities, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.mappingOfOT, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.mfPositiveLineList, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.verticalControlUnits, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.verticalControlFieldUnits, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		corporations.hasMany(models.mdaIDACoverages, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return corporations;
};
