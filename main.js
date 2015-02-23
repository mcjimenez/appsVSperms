'use strict';

var Config = require('./config.js');
var Spreadsheets = require('./spreadsheets.js');
var options = require('./options.js');

if (options.args.help) {
  console.log('Usage: node ' + options.name + ' [options]');
  console.log('Options: ');
  console.log(' --h | --help: Show this');
  console.log(' --oneSheet | --one | one: Show information in one table');
  console.log('    each cell contains App, Trusted, Privileged, Certified ');
  console.log('    access way');
  console.log(' --twoSheet | --two | two: Show two tables:');
  console.log('        appsVsPermissions and permissionsVSgrandPermissionMode');
  console.log(' --csv | csv: output file in CSV format');
  console.log(' --xlsx | xlsx: output file in XLSX format');
  console.log('   All information in two table and XLSX format by default');
  return;
}

var spreadsheets = new Spreadsheets(Config, options.args.tables);

if (options.args.format === options.CSV_FORMAT) {
  spreadsheets.createCsv();
} else {
  spreadsheets.createXlsx();
}

