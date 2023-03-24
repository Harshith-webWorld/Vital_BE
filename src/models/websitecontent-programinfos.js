module.exports = (sequelize, DataTypes) => {
	const websiteContentProgramInfos = sequelize.define("websiteContentProgramInfos", {
		programInfoHeader: {
			type: DataTypes.STRING(500),
		},
		programInfoDescriptionShortHTML: {
			type: DataTypes.TEXT,
			validate: {
				len: {
					args: [0, 1000],
					msg: "Maximum characters are 1000"
				}
			}
		},
		programInfoDescriptionLongHTML: {
			type: DataTypes.TEXT,
			validate: {
				len: {
					args: [0, 3000],
					msg: "Maximum characters are 3000"
				}
			}
		},
		programInfoImage: {
			type: DataTypes.STRING(500),
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
	websiteContentProgramInfos.associate = (models) => {
		websiteContentProgramInfos.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false

		});
		websiteContentProgramInfos.hasMany(models.websiteContentProgramInfoSections, {
			foreignKey: "programInfoId",
			allowNull: false,
			constraints: false

		});
		websiteContentProgramInfos.hasMany(models.websiteContentProgramInfoLinks, {
			foreignKey: "programInfoId",
			allowNull: false,
			constraints: false

		});
	};

	return websiteContentProgramInfos;
};
