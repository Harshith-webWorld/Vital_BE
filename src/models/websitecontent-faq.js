module.exports = (sequelize, DataTypes) => {
	const websiteContentFaq = sequelize.define("websiteContentFaq", {
		question: {
			type: DataTypes.STRING(500),
			allowNull: false,
			validate: {
				len: {
					args: [0, 500],
					msg: "Maximum characters are 500"
				}
			}
		},
		answer: {
			type: DataTypes.TEXT,
			allowNull: false, validate: {
				len: {
					args: [0, 4000],
					msg: "Maximum characters are 4000"
				}
			}
		},
		isShowPublic: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		displayOrder: {
			type: DataTypes.INTEGER,
			allowNull: true
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
	websiteContentFaq.associate = (models) => {
		websiteContentFaq.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false

		});
	};
	return websiteContentFaq;
}