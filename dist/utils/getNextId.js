"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ref = function () {
  var id_counter = 0;

  function getNextId() {
    if (id_counter < 0) return "id_0";else return "id_".concat(++id_counter);
  }

  return {
    getNextId: getNextId
  };
}(),
    getNextId = _ref.getNextId;

var _default = getNextId;
exports.default = _default;