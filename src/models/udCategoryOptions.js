module.exports = (sequelize, DataTypes) => {
	const udCategoryOptions = sequelize.define("udCategoryOptions", {
		categoryCode: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		categoryName: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		categoryOptionCode: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
        categoryOptionName: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
        categoryOptionEnum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        categoryOptionSortOrder: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
	udCategoryOptions.associate = (models) => {
		udCategoryOptions.hasMany(models.lymphedemaLineList, {
			foreignKey: "unitOfAction",
			as:"UnitOfAction",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.mfPositiveLineList, {
			foreignKey: "unitOfAction",
			as:"UnitOfAction2",
			allowNull: false,
			constraints: false,
		});
		
		udCategoryOptions.hasMany(models.entomologicalLarvicidalList, {
			foreignKey: "typeOfUnit",
			as:"TypeOfUnit",
			allowNull: false,
			constraints: false,
		});
		
		udCategoryOptions.hasMany(models.verticalUnitStockPositions, {
			foreignKey: "unit",
			as:"verticalUnit",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.verticalUnitStockPositions, {
			foreignKey: "items",
			as:"tabletName",
			allowNull: false,
			constraints: false,
		});
		
		udCategoryOptions.hasMany(models.staffPosVerticalUnits, {
			foreignKey: "typeOfUnit",
			as:"TypeOfUnit2",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.staffPosVerticalUnits, {
			foreignKey: "cadre",
			as:"Cadre",
			allowNull: false,
			constraints: false,
		});
		
		udCategoryOptions.hasMany(models.verticalUnitStockPositions, {
			foreignKey: "unitType",
			as:"UnitType",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.staffPosVerticalUnitStaffs, {
			foreignKey: "designationId",
			as:"Designation",
			allowNull: false,
			constraints: false,
		});
		// udCategoryOptions.hasMany(models.tasSurvey, {
		// 	foreignKey: "result",
		// 	as:"Result",
		// 	allowNull: false,
		// 	constraints: false,
		// });
		udCategoryOptions.hasMany(models.tasSurvey, {
			foreignKey: "typeOfSchool",
			as:"TypeOfSchool2",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.mfPositiveLineListPatients, {
			foreignKey: "gender",
			as:"Gender",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.tasSurveyChildrens, {
			foreignKey: "sex",
			as:"Sex",
			allowNull: false,
			constraints: false,
		});
		// udCategoryOptions.hasMany(models.tasSurvey, {
		// 	foreignKey: "sexCB",
		// 	as:"SexCB",
		// 	allowNull: false,
		// 	constraints: false,
		// });
		// udCategoryOptions.hasMany(models.staffPosVerticalUnits, {
		// 	foreignKey: "cadre",
		// 	as:"Cadre",
		// 	allowNull: false,
		// 	constraints: false,
		// });
		udCategoryOptions.hasMany(models.lymphedemaLineList, {
			foreignKey: "grading",
			as:"Grading",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.lymphedemaLineListFollowUpsHF, {
			foreignKey: "surgeryNotPossibleReasonsId",
			as:"SurgeryNotPossibleReasonsId",
			allowNull: false,
			constraints: false,
		});
		
		udCategoryOptions.hasMany(models.lymphedemaLineListFollowUpsLF, {
			foreignKey: "followUpLostReasonsId",
			as:"FollowUpLostReasonsId",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.mfPositiveLineList, {
			foreignKey: "bsCollectionAntigenTest",
			as:"BsCollectionAntigenTest",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.mfPositiveLineListPatients, {
			foreignKey: "gender",
			as:"Gender1",
			allowNull: false,
			constraints: false,
		});
		udCategoryOptions.hasMany(models.staffPosVerticalUnits, {
			foreignKey: "cadre",
			as:"Cadre2",
			allowNull: false,
			constraints: false,
		});
		
		

	};

	return udCategoryOptions;
};
