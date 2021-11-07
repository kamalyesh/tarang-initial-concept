"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function binaryCeil(number) {
  var returnValue = 1;

  do {
    returnValue = returnValue * 2;
    number = number / 2;
  } while (number / 2 > 0);

  return returnValue;
}

var _default = binaryCeil;
exports.default = _default;