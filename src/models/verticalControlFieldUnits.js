module.exports = (sequelize, DataTypes) => {
	const verticalControlFieldUnits = sequelize.define(
		"verticalControlFieldUnits",
		{
			verticalControlUnitId: {
				type: DataTypes.INTEGER,
			},
			fieldUnitName: {
				type: DataTypes.STRING(100),
			},
			fieldUnitType: {
				type: DataTypes.STRING(10),
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
			villageId: {
				type: DataTypes.INTEGER,
			},
			zoneId: {
				type: DataTypes.INTEGER,
			},
			wardId: {
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
		}
	);
	verticalControlFieldUnits.associate = (models) => {
		verticalControlFieldUnits.belongsTo(models.users, {
			foreignKey: "id",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.districts, {
			foreignKey: "districtId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.states, {
			foreignKey: "stateId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.villages, {
			foreignKey: "villageId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.zones, {
			foreignKey: "zoneId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.wards, {
			foreignKey: "wardId",
			constraints: false,
		});
		verticalControlFieldUnits.belongsTo(models.verticalControlUnits, {
			foreignKey: "verticalControlUnitId",
			constraints: false,
		});
	};

	return verticalControlFieldUnits;
};
