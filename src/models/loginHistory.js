module.exports = (sequelize, DataTypes) => {
	const loginHistory = sequelize.define("loginHistory", {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		loginTime: {
			type: DataTypes.DATE
		},
		logoutTime: {
			type: DataTypes.DATE,
		},
		loginIP: {
			type: DataTypes.STRING(100)
		},
		createdBy: {
			type: DataTypes.INTEGER,
		}
	});
	loginHistory.associate = (models) => {
		loginHistory.belongsTo(models.users, {
			foreignKey: "userId",
			allowNull: false,
			constraints: false,
		});
	};

	return loginHistory;
};
