module.exports = (sequelize, DataTypes) => {
	const zones = sequelize.define("zones", {
		zoneName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		corporationId: {
			type: DataTypes.INTEGER,
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
	zones.associate = (models) => {
		zones.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		zones.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		zones.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		zones.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.wards, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.facilities, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.subCenters, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.lymphedemaLineList, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.preMDAActivities, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.mfPositiveLineList, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.verticalControlFieldUnits, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		zones.hasMany(models.mdaIDACoverages, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return zones;
};
