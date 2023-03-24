module.exports = (sequelize, DataTypes) => {
	const staffPosVerticalUnitTrainingStatus = sequelize.define("staffPosVerticalUnitTrainingStatus", {
        staffPosVerticalUnitId: {
			type: DataTypes.BIGINT,
		},
		staffPosVerticalUnitStaffId: {
			type: DataTypes.BIGINT,
		},
		typeOfTraining: {
			type: DataTypes.STRING(100),
		},
        placeOfTraining: {
			type: DataTypes.STRING(100),
		},
        dateOfTraining: {
			type: DataTypes.DATEONLY,
		},
        isTrained: {
			type: DataTypes.BOOLEAN,
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
	staffPosVerticalUnitTrainingStatus.associate = (models) => {
		staffPosVerticalUnitTrainingStatus.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		staffPosVerticalUnitTrainingStatus.belongsTo(models.staffPosVerticalUnits, {
			foreignKey: "staffPosVerticalUnitId",
			allowNull: false,
			constraints: false,
		});
		staffPosVerticalUnitTrainingStatus.belongsTo(models.staffPosVerticalUnitStaffs, {
			foreignKey: "staffPosVerticalUnitStaffId",
			allowNull: false,
			constraints: false,
		});
	};

	return staffPosVerticalUnitTrainingStatus;
};
