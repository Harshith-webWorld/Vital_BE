module.exports = (sequelize, DataTypes) => {
	const mappingOfOTSurgeons = sequelize.define("mappingOfOTSurgeons", {
        mappingOfOTId: {
			type: DataTypes.INTEGER,
		},
        surgeonOrAnesthetist: {
			type: DataTypes.STRING(50),
		},
		nameOfDoctor: {
			type: DataTypes.STRING(100),
		},
		headquarter: {
			type: DataTypes.STRING(100),
			defaultValue:0
		},
		headquarterOther: {
			type: DataTypes.STRING(100),
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
	mappingOfOTSurgeons.associate = (models) => {
		mappingOfOTSurgeons.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		mappingOfOTSurgeons.belongsTo(models.mappingOfOT, {
			foreignKey: "mappingOfOTId",
			allowNull: false,
			constraints: false,
		});
	};

	return mappingOfOTSurgeons;
};
