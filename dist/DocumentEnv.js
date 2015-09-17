"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTitle() {
  return document.title;
}

function getReadyState() {
  return document.getReadyState;
}

exports["default"] = {
  getTitle: getTitle,
  getReadyState: getReadyState
};
module.exports = exports["default"];