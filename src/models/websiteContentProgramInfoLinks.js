module.exports = (sequelize, DataTypes) => {
	const websiteContentProgramInfoLinks = sequelize.define("websiteContentProgramInfoLinks", {
		programInfoId: {
			type: DataTypes.INTEGER,
		},
		programInfoSectionId: {
			type: DataTypes.INTEGER,
		},
        displayOrder: {
			type: DataTypes.INTEGER,
		},
		linkName: {
			type: DataTypes.STRING(500),
		},
        linkFileName: {
			type: DataTypes.STRING(500),
		},
        linkFileType: {
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
	websiteContentProgramInfoLinks.associate = (models) => {
		websiteContentProgramInfoLinks.belongsTo(models.websiteContentProgramInfos, {
			foreignKey: "programInfoId",
			allowNull: false,
			constraints: false

		});
        websiteContentProgramInfoLinks.belongsTo(models.websiteContentProgramInfoSections, {
			foreignKey: "programInfoSectionId",
			allowNull: false,
			constraints: false

		});
	};

	return websiteContentProgramInfoLinks;
};
