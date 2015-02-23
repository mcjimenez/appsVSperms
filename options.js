'use strict';

var CSV_FORMAT = 'csv';
var XLSX_FORMAT = 'xlsx';

//remove node
process.argv.shift();
//get program name
var name = process.argv.shift();
var argsArr = process.argv;
var args = {
  help: false
};

argsArr.forEach(function(v) {
  var value = v.toLowerCase();
  if (value === '-h' || value === '--h' || value === '--help') {
    args.help = true;
  }

  if (value === '--onesheet' || value === 'onesheet' ||
      value === 'one' || value === '--one') {
    args.tables = 1;
  }

  if (!args.tables &&
      (value === '--twosheet' || value === 'twosheet' ||
       value === 'two' || value === '--two')) {
    args.tables = 2;
  }

  if (value === 'csv' || value === '--csv') {
    args.format = CSV_FORMAT;
  } else {
    args.format = XLSX_FORMAT;
  }
});

if (!args.tables) {
  args.tables = 2;
}

module.exports = {
  name: name,
  args: args,
  CSV_FORMAT: CSV_FORMAT,
  XLSX_FORMAT: XLSX_FORMAT
}
