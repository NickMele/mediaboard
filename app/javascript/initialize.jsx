/* jshint node: true */
'use strict';

// Dependencies
var React = require('react');
var $ = require('jquery');

var MediaBoard = require('./components/MediaBoardApp');

$(function () {
  React.render(<MediaBoard />, document.getElementById('app'));
});
