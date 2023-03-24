module.exports = (sequelize, DataTypes) => {
	const verticalControlUnits = sequelize.define("verticalControlUnits", {
		nameOfControlUnit: {
			type: DataTypes.STRING(50),
		},
        unitType: {
			type: DataTypes.STRING(10),
		},
		nameOfOfficer: {
			type: DataTypes.STRING(100),
		},
		mobileNumber: {
			type: DataTypes.STRING(20),
		},
		stateId: {
			type: DataTypes.INTEGER,
		},
		districtId: {
			type: DataTypes.INTEGER,
		},
		corporationId: {
			type: DataTypes.INTEGER,
		},
		talukaId: {
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
	verticalControlUnits.associate = (models) => {
		verticalControlUnits.belongsTo(models.users, {
			foreignKey: "id",
			constraints: false,
		});
		verticalControlUnits.belongsTo(models.districts, {
			foreignKey: "districtId",
			constraints: false,
		});
		verticalControlUnits.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			constraints: false,
		});
		verticalControlUnits.belongsTo(models.states, {
			foreignKey: "stateId",
			constraints: false,
		});
		verticalControlUnits.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			constraints: false,
		});
		verticalControlUnits.hasMany(models.verticalControlFieldUnits, {
			foreignKey: "verticalControlUnitId",
			constraints: false,
		});
	};

	return verticalControlUnits;
};
