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

var _websitecontentVideos = _interopRequireDefault(require("../controllers/websitecontent-videos.controller"));

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/websitecontent-videos";

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
    console.log("cb::", file.originalname);
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
router.post("/create", upload.fields([{
  name: "videos"
}, {
  name: "thumbnail"
}]), _websitecontentVideos["default"].create).get("/list", _websitecontentVideos["default"].getwebsiteContentVideos).get("/getone", [(0, _expressValidator.query)("id").exists().withMessage("website Content Video Id is required")], _websitecontentVideos["default"].getwebsiteContentVideos).put("/update", upload.fields([{
  name: "videos"
}, {
  name: "thumbnail"
}]), _websitecontentVideos["default"].create)["delete"]("/delete", [(0, _expressValidator.query)("id").exists().withMessage("website Content Video is required")], _websitecontentVideos["default"].deletewebsiteContentVideos).get("/videos/:fileName", _websitecontentVideos["default"].getFile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-videos.route.js.map
