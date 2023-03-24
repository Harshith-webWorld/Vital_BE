"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _config = _interopRequireDefault(require("../../config/config"));

var fs = require("fs-extra");

var _ = require("lodash");

var UploadHelper = /*#__PURE__*/function () {
  function UploadHelper(files, id) {
    (0, _classCallCheck2["default"])(this, UploadHelper);
    this.files = files;
    this.id = id;
    this.errImgs = {};
    this.successImgs = {};
  }

  (0, _createClass2["default"])(UploadHelper, [{
    key: "moveFile",
    value: function () {
      var _moveFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(from, to, file_name, fieldname) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fs.move(from, to);

              case 3:
                if (!this.successImgs[fieldname]) {
                  this.successImgs[fieldname] = [];
                }

                this.successImgs[fieldname].push(file_name);
                console.log("success!");
                _context.next = 13;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                fs.pathExists(from, function (err, exists) {
                  if (exists) {
                    fs.remove(from, function (err) {
                      if (err) {
                        return console.error(err);
                      }

                      console.log(file_name, " ----> remove success!");
                    });
                  }
                });

                if (!this.errImgs[fieldname]) {
                  this.errImgs[fieldname] = [];
                }

                this.errImgs[fieldname].push(file_name);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function moveFile(_x, _x2, _x3, _x4) {
        return _moveFile.apply(this, arguments);
      }

      return moveFile;
    }()
  }, {
    key: "getFolderPath",
    value: function getFolderPath() {
      var id = this.id;
      return "".concat(id % 100, "/").concat(id % 1000);
    }
  }, {
    key: "saveImageRecord",
    value: function saveImageRecord(user_type, imgId) {
      var _this = this;

      var files = this.files,
          id = this.id;
      var folder_path = this.getFolderPath();
      this.errImgs = {};
      this.successImgs = {};
      var base_path = "".concat(_config["default"].UPLOAD_PATH, "/").concat(user_type, "/").concat(id, "/").concat(folder_path);
      return new Promise( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _.forEach(files, function (file) {
                    var to_image;
                    var base_img_path = "".concat(base_path, "/").concat(file.fieldname, "/");
                    to_image = "".concat(base_img_path, "/").concat(file.originalname);

                    _this.moveFile(file.path, to_image, file.originalname, file.fieldname);
                  });

                case 2:
                  if (_.size(_this.errImgs) == 0) {
                    resolve({
                      status: "success",
                      records: _this.successImgs
                    });
                  } else {
                    reject({
                      status: "error",
                      records: _this.errImgs
                    });
                  }

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x5, _x6) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "deleteImage",
    value: function deleteImage(user_type, imgId) {
      var files = this.files,
          id = this.id;
      var folder_path = this.getFolderPath();
      var base_path = "".concat(_config["default"].UPLOAD_PATH, "/").concat(user_type, "/").concat(id, "/").concat(folder_path);

      _.forEach(files, function (file) {
        var base_img_path = "".concat(base_path, "/").concat(file.fieldname, "/");

        if (imgId) {
          base_img_path = "".concat(base_img_path).concat(imgId, "/");
        }

        fs.unlink(base_img_path + file.originalname);
      });
    }
  }, {
    key: "removeImage",
    value: function removeImage(path) {
      console.log("path", path);
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return fs.readdir(path, function (err, images) {
                    _.forEach(images, function (image) {
                      fs.unlink("".concat(path, "/").concat(image));
                    });

                    resolve({
                      response: "success"
                    });
                  });

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x7, _x8) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "deleteFolder",
    value: function deleteFolder(id) {
      var base_path = "".concat(_config["default"].UPLOAD_PATH, "/attachment/").concat(id);
      console.log("base_path", base_path); // fs.remove('base_path');
    }
  }, {
    key: "getDownloadPath",
    value: function getDownloadPath(user_type) {
      var folder_path = this.getFolderPath();
      var base_path = "".concat(_config["default"].UPLOAD_PATH, "/").concat(user_type, "/").concat(this.id, "/").concat(folder_path);
      return base_path;
    }
  }]);
  return UploadHelper;
}();

var _default = UploadHelper;
exports["default"] = _default;
//# sourceMappingURL=uploads.js.map
