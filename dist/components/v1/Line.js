"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Line;

var _react = require("react");

var _getNextId = _interopRequireDefault(require("../../utils/getNextId"));

var _binrayFloor = _interopRequireDefault(require("../../utils/binrayFloor"));

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Line(_ref) {
  var audioUrl = _ref.audioUrl,
      coverArtUrl = _ref.coverArtUrl,
      width = _ref.width,
      height = _ref.height,
      _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? false : _ref$controls;
  // TODO: add state loaded. to check that the user has interacted with the page. so that the autoplay functionality can also be added in future
  var initialDimensions = {
    WIDTH: 256,
    HEIGHT: 280,
    PLAYER_HEIGHT: 80
  };

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPlaying = _useState2[0],
      setIsPlaying = _useState2[1];

  var _useState3 = (0, _react.useState)((0, _getNextId.default)()),
      _useState4 = _slicedToArray(_useState3, 2),
      canvasId = _useState4[0],
      setCanvasId = _useState4[1];

  var _useState5 = (0, _react.useState)(initialDimensions),
      _useState6 = _slicedToArray(_useState5, 2),
      dimensions = _useState6[0],
      setDimensions = _useState6[1];

  var audioRef = (0, _react.useRef)(new Audio());
  var audioContextRef = (0, _react.useRef)(null);
  var audioSrcRef = (0, _react.useRef)(null);
  var analyserRef = (0, _react.useRef)(null);
  var svgRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (width || height) {
      var newDimensions = dimensions;
      if (width) newDimensions.WIDTH = (0, _binrayFloor.default)(width);
      if (height) newDimensions.HEIGHT = height;
      setDimensions(newDimensions);
    }
  }, [width, height]);

  var clearSvg = function clearSvg() {
    if (svgRef.current) svgRef.current.selectAll("*").remove();
    console.log("clearing svg");
  };

  var updateSvg = function updateSvg(frequencies) {
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dimensions.HEIGHT - dimensions.PLAYER_HEIGHT;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dimensions.WIDTH;
    analyserRef.current.getByteFrequencyData(frequencies);

    if (svgRef.current && frequencies.length) {
      clearSvg();
      var line1Func = d3.line().x(function (d, i) {
        return i * (width / frequencies.length);
      }).y(function (d) {
        return height * 0.9 - d * 0.4;
      });
      var line2Func = d3.line().x(function (d, i) {
        return i * (width / frequencies.length);
      }).y(function (d) {
        return height * 0.9 - d * 0.8;
      });
      svgRef.current.append('path') // .attr('d', line1Func(frequencies))
      .attr('d', line2Func(frequencies)).attr('stroke', 'black').attr('fill', 'none');
    }
  };

  var createSvg = function createSvg(frequencies) {
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (dimensions.HEIGHT - dimensions.PLAYER_HEIGHT) * 0.9;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dimensions.WIDTH;
    if (!d3) console.warn("d3 is not found. Tarang may not behave as expected.");else {
      // console.log("creating visualization graph ", { d3 })
      if (!svgRef.current) {
        svgRef.current = d3.select('#' + canvasId).append('svg').attr('height', height).attr('width', width).attr('class', 'my-1').attr('style', coverArtUrl ? "background: url(".concat(coverArtUrl, ");") : 'background: liniear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 118, 124, 0.73))').attr('id', "line_" + canvasId + "_" + (0, _getNextId.default)());
      }

      var updateFrequencyData = function updateFrequencyData() {
        try {
          if (!audioRef.current || audioRef.current.paused) {
            cancelAnimationFrame(updateFrequencyData); // return;
          } else {
            requestAnimationFrame(updateFrequencyData);
            updateSvg(frequencies);
          }
        } catch (error) {
          console.error(error);
        }
      };

      updateFrequencyData();
    }
  }; // useEffect(updateSvg, [frequencyData])


  var play = function play() {
    try {
      setIsPlaying(true);
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      if (!audioSrcRef.current) audioSrcRef.current = audioContextRef.current.createMediaElementSource(new Audio(audioUrl));
      audioRef.current = audioSrcRef.current.mediaElement;
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.play();

      audioRef.current.onended = function (event) {
        return clearSvg();
      };

      analyserRef.current = audioContextRef.current.createAnalyser();
      audioSrcRef.current.connect(analyserRef.current);
      audioSrcRef.current.connect(audioContextRef.current.destination);
      analyserRef.current.fftSize = dimensions.WIDTH;
      var bufferLength = analyserRef.current.frequencyBinCount;
      var frequencies = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(frequencies); // console.log({ frequencies })

      createSvg(frequencies);
    } catch (error) {
      console.error(error);
    }
  };

  var stop = function stop() {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    clearSvg();
  };

  var focusIn = function focusIn() {
    if (!controls) {
      if (!isPlaying) {
        play();
      }
    }
  };

  var focusOut = function focusOut() {
    if (!controls) {
      if (isPlaying) {
        stop();
      }
    }
  };

  var toggleFocus = function toggleFocus() {
    if (isPlaying) focusOut();else focusIn();
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: focusIn,
    onFocus: focusIn,
    onPointerEnter: focusIn // onTouch={toggleFocus}
    // onClick={toggleFocus}
    ,
    onMouseLeave: focusOut,
    onBlur: focusOut,
    onPointerLeave: focusIn,
    style: {
      top: 0,
      left: 0,
      width: dimensions.WIDTH,
      height: dimensions.HEIGHT,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: canvasId,
    style: {
      "flex": 1,
      position: "absolute",
      top: 0,
      bottom: controls ? 40 : 0,
      left: 0,
      right: 0,
      backgroundColor: "#eeeeeeaa"
    }
  }), controls ? /*#__PURE__*/React.createElement("div", {
    style: {
      "flex": 1,
      position: "absolute",
      top: dimensions.HEIGHT - 40,
      bottom: 0,
      left: 0,
      right: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: play
  }, "Play"), /*#__PURE__*/React.createElement("button", {
    onClick: stop
  }, "Stop")) : /*#__PURE__*/React.createElement(React.Fragment, null)));
}