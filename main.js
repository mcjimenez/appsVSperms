'use strict';

var Config = require('./config.js');
var Spreadsheets = require('./spreadsheets.js');
var options = require('./options.js');
var google = require('./googleSpreadsheet.js');

if (options.args.help) {
  console.log('Usage: node ' + options.name + ' [options]');
  console.log('Options: (only one)');
  console.log(' --h | --help: Show this');
  console.log(' --one: Show information in one table');
  console.log(' --two: Show two tables:');
  console.log('        appsVsPermissions and permissionsVSgrandPermissionMode');
  console.log('   All information in one table by default');
  return;
}

//var spreadsheets = new Spreadsheets(Config, options.args.tables);

//spreadsheets.getCsv();

