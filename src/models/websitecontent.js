module.exports = (sequelize, DataTypes) => {
    const websiteContent = sequelize.define("websiteContent", {
        websiteName: {
			type: DataTypes.STRING(500),
		},
        tollFreeNumber: {
			type: DataTypes.STRING(20),
		},
        helpLineNumbers: {
			type: DataTypes.STRING(100),
		},
        contactUsText: {
			type: DataTypes.STRING(500),
		},
        contactUsEmail: {
			type: DataTypes.STRING(100),
		},
        websiteDescription: {
			type: DataTypes.STRING(1000),
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
    websiteContent.associate = (models) => {
		websiteContent.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false

		});
	};

    return websiteContent;
}