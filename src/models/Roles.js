module.exports = (sequelize, DataTypes) => {
	const roles = sequelize.define("roles", {
		roleName: {
			type: DataTypes.STRING(32),
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
	roles.associate = (models) => {
		roles.hasMany(models.userRoleScreenActivities, {
			foreignKey: "roleId",
			allowNull: false,
			constraints: false,
		});
		roles.hasMany(models.users, {
			foreignKey: "roleId",
			allowNull: false,
			constraints: false,
		});
   };

	return roles;
};
