"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Line = _interopRequireDefault(require("./Line"));

var _Bar = _interopRequireDefault(require("./Bar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Line: _Line.default,
  Bar: _Bar.default
};
exports.default = _default;