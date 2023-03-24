"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bcrypt = _interopRequireDefault(require("../services/bcrypt.service"));

module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define("users", {
    id: {
      type: _sequelize["default"].INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    mobileNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    govtIdProof: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    govtIdProofno: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    institutionId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    institutionTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activitiId: {
      type: DataTypes.INTEGER
    },
    districtId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userOtp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER
    },
    lastModifiedBy: {
      type: DataTypes.INTEGER
    }
  });

  users.associate = function (models) {
    users.belongsTo(models.designations, {
      foreignKey: "designationId",
      allowNull: false,
      constraints: false
    });
    users.belongsTo(models.institutionTypes, {
      foreignKey: "institutionTypeId",
      allowNull: false,
      constraints: false
    });
    users.belongsTo(models.roles, {
      foreignKey: "roleId",
      allowNull: false,
      constraints: false
    });
    users.belongsTo(models.districts, {
      foreignKey: "districtId",
      allowNull: false,
      constraints: false
    });
    users.hasMany(models.userRoleScreenActivities, {
      foreignKey: "userId",
      allowNull: false,
      constraints: false
    });
  };

  users.beforeCreate(function (user) {
    if (user && user.password) {
      user.password = (0, _bcrypt["default"])().password(user.password);
    }
  });
  users.beforeBulkUpdate(function (user) {
    if (user.attributes && user.attributes.password) {
      user.attributes.password = (0, _bcrypt["default"])().updatePassword(user.attributes.password);
    }
  });
  return users;
};
//# sourceMappingURL=user.js.map
