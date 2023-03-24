module.exports = (sequelize, DataTypes) => {
	const postMDAEvalList = sequelize.define("postMDAEvalList", {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		srNo: {
			type: DataTypes.STRING(50),
		},
		stateId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		districtId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		corporationId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		talukaId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		facilityId: {
			type: DataTypes.INTEGER,
		},
		subCenterId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		wardId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		villageId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		year: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		month: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		urbanArea: {
			type: DataTypes.STRING(50),
		},
		nameOfInvestigator: {
			type: DataTypes.STRING(50),
		},
		dateOfInvestigation: {
			type: DataTypes.DATEONLY,
		},
		nameOfHeadOfFamily: {
			type: DataTypes.STRING(50),
		},
		nameOfPersonInterviewed: {
			type: DataTypes.STRING(50),
		},
		totalMembersInFamily: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		noMembersInterviewed: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		mdaUndertakenOnFrom: {
			type: DataTypes.DATEONLY,
		},
		mdaUndertakenOnTo: {
			type: DataTypes.DATEONLY,
		},
		isDECTabletsRecovered: {
			type: DataTypes.BOOLEAN,
		},
		noDECTabletsRecovered: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		reasonNotTakingDrug: {
			type: DataTypes.STRING(100),
		},
		isDrugAdministeredInHouse: {
			type: DataTypes.BOOLEAN,
		},
		isDDEnsureSwallowInPresence: {
			type: DataTypes.BOOLEAN,
		},
		isDrugSwallowInDDPresence: {
			type: DataTypes.BOOLEAN,
		},
		reasonForNotSwallowDrug: {
			type: DataTypes.STRING(100),
		},
		reasonForNotSwallowDrugOther: {
			type: DataTypes.STRING(100),
		},
		isDDPersuadeSwallowDrug: {
			type: DataTypes.BOOLEAN,
		},
		isHelpedDDInDrugCompliance: {
			type: DataTypes.BOOLEAN,
		},
		isReservationAboutDD: {
			type: DataTypes.BOOLEAN,
		},
		reservationDrugAdmin: {
			type: DataTypes.STRING(500),
		},
		reservationDrugAdminOther: {
			type: DataTypes.STRING(500),
		},
		speciFyResponsibilityOfDD: {
			type: DataTypes.STRING(100),
		},
		isDDExplainToYouDetails: {
			type: DataTypes.BOOLEAN,
		},
		approachShouldFollow: {
			type: DataTypes.INTEGER,
		},
		reasonToFollowApproach: {
			type: DataTypes.STRING(100),
		},
		isPriorInfoAboutMDAwithDE: {
			type: DataTypes.BOOLEAN,
		},
		sourceOfInformation: {
			type: DataTypes.STRING(100),
		},
		isReadOrSeeAnyInfo: {
			type: DataTypes.BOOLEAN,
		},
		whereReadOrSeeInfo: {
			type: DataTypes.STRING(500),
		},
		whereReadOrSeeInfoOthers: {
			type: DataTypes.STRING(500),
		},
		whichIsMostEffective: {
			type: DataTypes.STRING(500),
		},
		isYouExperienceSideEffects: {
			type: DataTypes.BOOLEAN,
		},
		noMembersExperienceSideEffects : {
			type: DataTypes.INTEGER,
		},
		detailsOfSideEffects: {
			type: DataTypes.STRING(500),
		},
		detailsOfSideEffectsOther: {
			type: DataTypes.STRING(100),
		},
		isYouSeekRemedy: {
			type: DataTypes.BOOLEAN,
		},
		detailsOfRemedyTaken: {
			type: DataTypes.STRING(100),
		},
		detailsOfRemedyTakenOther: {
			type: DataTypes.STRING(100),
		},
		IsYouReceiveTreatmentOtherAilment: {
			type: DataTypes.BOOLEAN,
		},
		IsAnyFamilySufferLF: {
			type: DataTypes.BOOLEAN,
		},
		OtherRelevantInfoOnMDA: {
			type: DataTypes.STRING(100),
		},
		DateOfEvaluation: {
			type: DataTypes.DATEONLY,
		},
		IsVerifiedByInvestigator: {
			type: DataTypes.BOOLEAN,
		},
		Remarks: {
			type: DataTypes.STRING(250),
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
	postMDAEvalList.associate = (models) => {
		postMDAEvalList.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.facilities, {
			foreignKey: "facilityId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.subCenters, {
			foreignKey: "subCenterId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.wards, {
			foreignKey: "wardId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.belongsTo(models.villages, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.hasMany(models.postMDAEvalListPersons, {
			foreignKey: "postMDAEvalListId",
			allowNull: false,
			constraints: false,
		});
		postMDAEvalList.hasMany(models.postMDAEvalListFMembers, {
			foreignKey: "postMDAEvalListId",
			allowNull: false,
			constraints: false,
		});
	};

	return postMDAEvalList;
};
