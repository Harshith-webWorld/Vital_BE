"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _expressValidator = require("express-validator");

var _websitecontentPrograminfos = _interopRequireDefault(require("../controllers/websitecontent-programinfos.controller"));

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/website-programinfos";

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    console.log("filePath::  ".concat(filepath));
    console.log("file exists:: ".concat(_fs["default"].existsSync(filepath)));

    if (!_fs["default"].existsSync(filepath)) {
      _fs["default"].mkdirSync(filepath, {
        recursive: true
      });
    }

    callback(null, filepath);
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
router.post("/create-programInfo", upload.fields([{
  name: "programInfos"
}]), _websitecontentPrograminfos["default"].create).get("/listProgramInfos", _websitecontentPrograminfos["default"].getwebsiteContentProgramInfos).get("/getone-programInfo/:id", _websitecontentPrograminfos["default"].getwebsiteContentProgramInfos).put("/update-programInfo/:id", upload.fields([{
  name: "programInfos"
}]), _websitecontentPrograminfos["default"].create)["delete"]("/delete-programInfo/:id", _websitecontentPrograminfos["default"].deletewebsiteContentProgramInfos).get("/blogs/:fileName", _websitecontentPrograminfos["default"].getFile).post("/create-programInfoLink", upload.fields([{
  name: "programInfoLinks"
}]), _websitecontentPrograminfos["default"].createProgramInfoLinks).get("/listProgramInfoLinks/:programInfoId", _websitecontentPrograminfos["default"].getwebsiteContentProgramInfoLinks).get("/getone-programInfoLink/:id", _websitecontentPrograminfos["default"].getwebsiteContentProgramInfoLinks).put("/update-programInfoLink/:id", _websitecontentPrograminfos["default"].createProgramInfoLinks)["delete"]("/delete-programInfoLink/:id", _websitecontentPrograminfos["default"].deletewebsiteContentProgramInfoLinks).get("/programInfoLinks/:fileName", _websitecontentPrograminfos["default"].getProgramInfoLinkFile).post("/create-programInfoSection", _websitecontentPrograminfos["default"].createProgramInfoSections).get("/listProgramInfoSections/:programInfoId", _websitecontentPrograminfos["default"].getwebsiteContentProgramInfoSections).get("/getone-programInfoSection/:id", _websitecontentPrograminfos["default"].getwebsiteContentProgramInfoSections).put("/update-programInfoSection/:id", _websitecontentPrograminfos["default"].createProgramInfoSections)["delete"]("/delete-programInfoSection/:id", _websitecontentPrograminfos["default"].deletewebsiteContentProgramInfoSections);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-programinfos.route.js.map
