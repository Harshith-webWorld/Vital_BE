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

var _websitecontentOthers = _interopRequireDefault(require("../controllers/websitecontent-others.controller"));

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/websitecontent-others";

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
router.post("/createMenu", upload.fields([{
  name: "others"
}]), _websitecontentOthers["default"].create).get("/listMenu", _websitecontentOthers["default"].getwebsiteContentOthers).get("/getoneMenu/:id", _websitecontentOthers["default"].getwebsiteContentOthers).put("/updateMenu/:id", upload.fields([{
  name: "others"
}]), _websitecontentOthers["default"].create)["delete"]("/deleteMenu/:id", _websitecontentOthers["default"].deletewebsiteContentOthers).post("/create-OthersLink", upload.fields([{
  name: "otherslink"
}]), _websitecontentOthers["default"].createOthersLinks).get("/listOthersLinks/:otherMenuId", _websitecontentOthers["default"].getwebsiteContentOthersLinks).get("/getone-OthersLink/:id", _websitecontentOthers["default"].getwebsiteContentOthersLinks).put("/update-OthersLink/:id", upload.fields([{
  name: "otherslink"
}]), _websitecontentOthers["default"].createOthersLinks)["delete"]("/delete-OthersLink/:id", _websitecontentOthers["default"].deletewebsiteContentOthersLinks).post("/create-OthersSection", _websitecontentOthers["default"].createOthersections).get("/listOthersSections/:otherMenuId", _websitecontentOthers["default"].getwebsiteContentOthersSections).get("/getone-OthersSection/:id", _websitecontentOthers["default"].getwebsiteContentOthersSections).put("/update-OthersSection/:id", _websitecontentOthers["default"].createOthersections)["delete"]("/delete-OthersSection/:id", _websitecontentOthers["default"].deletewebsiteContentOthersSections).get("/otherslink/:fileName", _websitecontentOthers["default"].getothersLinkFile).get("/blogs/:fileName", _websitecontentOthers["default"].getFile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websitecontent-others.route.js.map
