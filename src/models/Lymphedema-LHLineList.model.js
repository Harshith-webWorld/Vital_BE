
module.exports = (sequelize, DataTypes) => {
	const lymphedemaLineList = sequelize.define("lymphedemaLineList", {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		patientId: {
			type: DataTypes.STRING(50),
		},
		nameOfPatient: {
			type: DataTypes.STRING(50)
		},
		patientRegistrationDate: {
			type: DataTypes.DATEONLY
		},
		headOfFamily: {
			type: DataTypes.STRING(50)
		},
		year: {
			type: DataTypes.INTEGER
		},
		month: {
			type: DataTypes.INTEGER
		},
		unitOfAction: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		nameOfFiledUnit: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		nameOfUnit: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		districtId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		corporationId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		talukaId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		zoneId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		facilityId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		town: {
			type: DataTypes.STRING(50),
		},
		subCenterId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		wardId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		villageId: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		area: {
			type: DataTypes.STRING(50),
		},
		ageYears: {
			type: DataTypes.INTEGER,
		},
		ageMonths: {
			type: DataTypes.INTEGER,
		},
		gender: {
			type: DataTypes.INTEGER,
		},
		permanentAddressLine1: {
			type: DataTypes.STRING(100),
		},
		permanentAddressLine2: {
			type: DataTypes.STRING(100),
		},
		permanentAddressCity: {
			type: DataTypes.STRING(100),
		},
		permanentAddressState: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		permanentAddressPINCode: {
			type: DataTypes.STRING(10),
		},
		stayingInYears: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		stayingInMonths: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		isFromBirth:{
			type: DataTypes.BOOLEAN,
		},
		patientMobileNumber: {
			type: DataTypes.STRING(20),
		},
		ashaMobileNumber: {
			type: DataTypes.STRING(20),
		},
		secondaryContactNumber: {
			type: DataTypes.STRING(20),
		},
		isAffectedLeftLeg: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedRightLeg: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedLeftHand: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedRightHand: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedLeftScrotum: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedRightScrotum: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedLeftBreast: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedRightBreast: {
			type: DataTypes.BOOLEAN,
		},
		isAffectedOthers: {
			type: DataTypes.BOOLEAN,
		},
		affectedOthersNotes: {
			type: DataTypes.STRING(250),
		},
		diseaseType: {
			type: DataTypes.STRING(250),
		},
		grading: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		isPresenceOfBlisters: {
			type: DataTypes.BOOLEAN,
		},
		diseaseLastedYears: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		diseaseLastedMonths: {
			type: DataTypes.INTEGER,
			defaultValue: 0
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
		}
	});

	lymphedemaLineList.associate = (models) => {
		lymphedemaLineList.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.subCenters, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.zones, {
			foreignKey: "zoneId",
			allowNull: false,
			constraints: false,
		});

		lymphedemaLineList.belongsTo(models.facilities, {
			foreignKey: "facilityId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.wards, {
			foreignKey: "wardId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.villages, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.hasMany(models.lymphedemaLineListSurvey, {
			foreignKey: "lymphedemaLineListId",
			as: "LymphedemaLineListSurveys",
			allowNull: false,
			constraints: false,
		});
		lymphedemaLineList.belongsTo(models.udCategoryOptions, {
			foreignKey: "grading",
			as: "Grading",
			allowNull: false,
			constraints: false
		});
		lymphedemaLineList.hasMany(
			models.lymphedemaLineListFollowUpsLF,
			{
				foreignKey: "lymphedemaLineListId",
				as: "LymphedemaLineListFollowUpsLFs",
				allowNull: false,
				constraints: false,
			}
		);
		lymphedemaLineList.hasMany(
			models.lymphedemaLineListFollowUpsHF,
			{
				foreignKey: "lymphedemaLineListId",
				as: "LymphedemaLineListFollowUpsHFs",
				allowNull: false,
				constraints: false,
			}
		);
		lymphedemaLineList.belongsTo(models.udCategoryOptions, {
			foreignKey: "unitOfAction",
			as: "UnitOfAction",
			allowNull: false,
			constraints: false
		});
		lymphedemaLineList.belongsTo(models.verticalControlUnits, {
			foreignKey: "nameOfUnit",
			allowNull: false,
			constraints: false
		});
		lymphedemaLineList.belongsTo(models.verticalControlFieldUnits, {
			foreignKey: "nameOfFiledUnit",
			allowNull: false,
			constraints: false
		});
	};
	return lymphedemaLineList;
};
