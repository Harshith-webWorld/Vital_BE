module.exports = (sequelize, DataTypes) => {
	const websiteContentOthers = sequelize.define("websiteContentOthers", {
		menuType: {
			type: DataTypes.STRING
		},
		menuPageTitle: {
			type: DataTypes.STRING
		},
		menuContentImageName: {
			type: DataTypes.STRING
		},
		menuContentHTML: {
			type: DataTypes.TEXT,
			validate: {
				len: {
					args: [0, 1000],
					msg: "Maximum characters are 1000"
				}
			}
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		createdBy: {
			type: DataTypes.INTEGER
		},
		lastModifiedBy: {
			type: DataTypes.INTEGER
		},
	});
	websiteContentOthers.associate = (models) => {
		websiteContentOthers.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false

		});
		websiteContentOthers.hasMany(models.websiteContentOthersSections, {
			foreignKey: "otherMenuId",
			allowNull: false,
			constraints: false

		});
		websiteContentOthers.hasMany(models.websiteContentOthersLinks, {
			foreignKey: "otherMenuId",
			allowNull: false,
			constraints: false

		});
	};

	return websiteContentOthers;
};
