"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function binaryFloor(number) {
  var returnValue = 1;

  while (number / 2 > 1) {
    returnValue = returnValue * 2;
    number = number / 2;
  } // console.log('returnValue', returnValue)


  return returnValue;
}

var _default = binaryFloor;
exports.default = _default;