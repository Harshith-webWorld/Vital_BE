module.exports = (sequelize, DataTypes) => {
	const screens = sequelize.define("screens", {
	
		screenCode: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		screenName: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		urlPath:{
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
	screens.associate = (models) => {
		screens.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
        screens.hasMany(models.userRoleScreenActivities, {
			foreignKey: "screenId",
			allowNull: false,
			constraints: false,
		});
	};

	return screens;
};
