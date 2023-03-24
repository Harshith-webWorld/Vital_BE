module.exports = (sequelize, DataTypes) => {
	const tasSurvey = sequelize.define("tasSurvey", {
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
		wardId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		villageId: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		tasId:{
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
		euId:{
			type: DataTypes.INTEGER,
			defaultValue:0

		},
		typeOfTAS: {
			type: DataTypes.STRING(100),
		},
		nameOfEU: {
			type: DataTypes.STRING(100),
		},
		DateOfSurvey: {
			type: DataTypes.DATEONLY,
		},
		nameOfSchool: {
			type: DataTypes.STRING(100),
		},
		typeOfSchool: {
			type: DataTypes.INTEGER,
			defaultValue:0
		},
		serialNoOfSchool: {
			type: DataTypes.STRING(50),
		},
		tokenNumberSB: {
			type: DataTypes.STRING(50),
		},
		nameOfEA: {
			type: DataTypes.STRING(50),
		},
		serialNumberOfEA: {
			type: DataTypes.INTEGER,
		},
		tokenNumberCB: {
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
	tasSurvey.associate = (models) => {
		tasSurvey.belongsTo(models.users, {
			foreignKey: "id",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.states, {
			foreignKey: "stateId",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.districts, {
			foreignKey: "districtId",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.corporations, {
			foreignKey: "corporationId",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.talukas, {
			foreignKey: "talukaId",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.wards, {
			foreignKey: "wardId",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.villages, {
			foreignKey: "villageId",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.belongsTo(models.udCategoryOptions, {
			foreignKey: "typeOfSchool",
			as:"TypeOfSchool2",
			allowNull: false,
			constraints: false,
		});
		tasSurvey.hasMany(models.tasSurveyChildrens, {
			foreignKey: "tasSurveyId",
			allowNull: false,
			constraints: false,
		});
	};
	return tasSurvey;
};
