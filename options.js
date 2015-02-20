'use strict';

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
  if (value === '--one' && !args.tables) {
    args.tables = 1;
  }
  if (value === '--two' && !args.tables) {
    args.tables = 2;
  }
});

if (!args.tables) {
  args.tables = 1;
}

module.exports = {
  name: name,
  args: args
}
