module.exports = (sequelize, DataTypes) => {
	const hydrocelectomyOperations = sequelize.define("hydrocelectomyOperations", {
		
		srNo: {
			type: DataTypes.STRING(50),
		},
        year: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		districtId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		jan: {
			type: DataTypes.INTEGER,
		},
        feb: {
			type: DataTypes.INTEGER,
		},
        mar: {
			type: DataTypes.INTEGER,
		},
        apr: {
			type: DataTypes.INTEGER,
		},
        may: {
			type: DataTypes.INTEGER,
		},
        jun: {
			type: DataTypes.INTEGER,
		},
        jul: {
			type: DataTypes.INTEGER,
		},
        aug: {
			type: DataTypes.INTEGER,
		},
        sep: {
			type: DataTypes.INTEGER,
		},
        oct: {
			type: DataTypes.INTEGER,
		},
        nov: {
			type: DataTypes.INTEGER,
		},
        dec: {
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
	hydrocelectomyOperations.associate = (models) => {
		hydrocelectomyOperations.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
	};

	return hydrocelectomyOperations;
};
