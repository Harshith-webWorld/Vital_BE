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

var _websitecontentImages = _interopRequireDefault(require("../controllers/websitecontent-images.controller"));

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/website-images";

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
router.post("/create", upload.fields([{
  name: "images"
}]), _websitecontentImages["default"].create).get("/list", _websitecontentImages["default"].getwebsiteContentImages).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage("website Images Id is required")], _websitecontentImages["default"].getwebsiteContentImages).put("/update", upload.fields([{
  name: "images"
}]), _websitecontentImages["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage("website Images Id is required")], _websitecontentImages["default"].deletewebsiteContentImages).get("/images/:fileName", _websitecontentImages["default"].getFile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-images.route.js.map
