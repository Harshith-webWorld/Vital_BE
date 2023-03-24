"use strict";

module.exports = function (sequelize, DataTypes) {
  var siteSettings = sequelize.define("siteSettings", {
    settingKey: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    settingValue: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    settingUnit: {
      type: DataTypes.STRING(15)
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
  siteSettings.bulkCreate([{
    "id": 1,
    "settingKey": "BannerTimer",
    "settingValue": 3,
    "settingUnit": "seconds",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }, {
    "id": 2,
    "settingKey": "VideoTimer",
    "settingValue": 4,
    "settingUnit": "seconds",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }, {
    "id": 3,
    "settingKey": "NewsTimer",
    "settingValue": 5,
    "settingUnit": "seconds",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }, {
    "id": 4,
    "settingKey": "BannerCountLimit",
    "settingValue": 10,
    "settingUnit": "numbers",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }, {
    "id": 5,
    "settingKey": "VideoCountLimit",
    "settingValue": 5,
    "settingUnit": "numbers",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }, {
    "id": 6,
    "settingKey": "NewsCountLimit",
    "settingValue": 5,
    "settingUnit": "numbers",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }, {
    "id": 7,
    "settingKey": "FAQCountLimit",
    "settingValue": 5,
    "settingUnit": "numbers",
    "isEnabled": "True",
    "isActive": "True",
    "createdBy": 1,
    "lastModifiedBy": 1,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }]);
  return siteSettings;
};
//# sourceMappingURL=siteSettings.js.map
