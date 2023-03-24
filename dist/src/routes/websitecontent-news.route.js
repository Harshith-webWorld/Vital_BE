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

var _websitecontentNews = _interopRequireDefault(require("../controllers/websitecontent-news.controller"));

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/website-news";

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    console.info("filePath::  ".concat(filepath));
    console.info("file exists:: ".concat(_fs["default"].existsSync(filepath)));

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
}]), _websitecontentNews["default"].create).get("/list", _websitecontentNews["default"].getwebsiteContentNews).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage("website News Id is required")], _websitecontentNews["default"].getwebsiteContentNews).put("/update", upload.fields([{
  name: "images"
}]), _websitecontentNews["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage("website News Id is required")], _websitecontentNews["default"].deletewebsiteContentNews).get("/news/:fileName", _websitecontentNews["default"].getFile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-news.route.js.map
