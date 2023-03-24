module.exports = (sequelize, DataTypes) => {
	const designations = sequelize.define("designations", {
	
		designationName: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		designationShortName: {
			type: DataTypes.STRING(100),
			allowNull: false,
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
	designations.associate = (models) => {
		designations.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
        designations.hasMany(models.users, {
			foreignKey: "designationId",
			allowNull: false,
			constraints: false,
		});
		designations.hasMany(models.staffPosVerticalUnitStaffs, {
			foreignKey: "designationId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return designations;
};
