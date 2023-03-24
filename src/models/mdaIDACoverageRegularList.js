module.exports = (sequelize, DataTypes) => {
	const mdaIDACoverageRegularList = sequelize.define("mdaIDACoverageRegularList", {
        mdaIDACoverageId: {
			type: DataTypes.INTEGER,
		},
        regular: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		noOfPeopleAdministered: {
			type: DataTypes.INTEGER,
		},
		noOfPersonsWithFever: {
			type: DataTypes.INTEGER,
		},
		noOfPersonsWithHeadache: {
			type: DataTypes.INTEGER,
		},
        noOfPersonsWithBodyache: {
			type: DataTypes.INTEGER,
		},
        noOfPersonsWithNausea: {
			type: DataTypes.INTEGER,
		},
		noOfPersonsWithVomiting: {
			type: DataTypes.INTEGER,
		},
		noOfPersonsRecovered: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		noOfPersonsNotRecovered: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		isRequiredHospitalStay: {
			type: DataTypes.BOOLEAN,
		},
		noOfPersonsRequiredHospitalStay: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
        remarks: {
			type: DataTypes.STRING(100),
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
	mdaIDACoverageRegularList.associate = (models) => {
		mdaIDACoverageRegularList.belongsTo(models.mdaIDACoverages, {
			foreignKey: "mdaIDACoverageId",
			allowNull: false,
			constraints: false,
		});
		mdaIDACoverageRegularList.hasMany(models.mdaIDACoverageOthersList, {
			foreignKey: "mdaIDACoverageRegularListId",
			allowNull: false,
			constraints: false,
		});
		
	};

	return mdaIDACoverageRegularList;
};
