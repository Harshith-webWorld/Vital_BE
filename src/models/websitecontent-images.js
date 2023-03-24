module.exports = (sequelize, DataTypes) => {
	const websiteContentImages = sequelize.define("websiteContentImages", {
		imageName: {
			type: DataTypes.STRING(500),
		},
		imageHeader: {
			type: DataTypes.STRING(500),
		},
		imageHtmlText: {
			type: DataTypes.STRING(1000),
			validate: {
				len: {
					args: [0, 1000],
					msg: "Maximum characters are 1000"
				}
			}
		},
		isShowPublic: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
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
	websiteContentImages.associate = (models) => {
		websiteContentImages.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false

		});
	};

	return websiteContentImages;
};
