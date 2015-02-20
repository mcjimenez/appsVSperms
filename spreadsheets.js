'use strict';

var https = require ('https');
var fs = require('fs');
var path = require('path');

var EOL = require('os').EOL;

var prmTable = null;
var config = null;
var nTables;

var apps = {};
var permissions = {};
var types = {
  '0': [],
  '1': [],
  '2': [],
  '3': [],
  '4': []
};
var sortedPerms = [];

var initialized = false;

function createPermissionsTableModule(cbk) {
  var permModule = config.permissionsModule;
  https.get(permModule.url, function(response){
    var permissionsStr = '';
    response.on('data', function(d) { permissionsStr += d; });
    response.on('end', function() {
      var startAt = permissionsStr.indexOf(permModule.startStr) +
                    permModule.startStr.length;
      var endAt = permissionsStr.indexOf(permModule.endStr, startAt) +
                  permModule.endStr.length - 1;
      permissionsStr = permissionsStr.substring(startAt , endAt);

      var nodeModule  = '\'use strict\';' +
                  'var DENY_ACTION = 0, PROMPT_ACTION = 1, ALLOW_ACTION = 2;' +
                  'module.exports = {' +
                  'DENY_ACTION: 0, PROMPT_ACTION: 1, ALLOW_ACTION: 2,' +
                  'permissionsTable:' + permissionsStr + '}';

      fs.writeFileSync(permModule.auxNodeModule, nodeModule);
      prmTable = require(permModule.auxNodeModule);

      createHeaders();
      addApps();

      cbk && cbk();
    });
  });
}

function getSymbol(value) {
  switch(value) {
    case prmTable.ALLOW_ACTION:
      return config.show.allow;
      break;
    case prmTable.PROMPT_ACTION:
      return config.show.prompt;
      break;
    case prmTable.DENY_ACTION:
      return config.show.deny;
      break;
    default:
      return config.show.unknow;
  }
}

function getType(target) {
  var type = 4;
  for (var i = 0, l = target.length; i < l && type === 4; i++) {
    if (target.charAt(i) === config.show.allow ||
        target.charAt(i) === config.show.prompt) {
      type = i;
    }
  }
  return type;
}

function createHeaders() {
  var permsTbl = prmTable.permissionsTable;
  for (var name in permsTbl) {
    var target = getSymbol(permsTbl[name].app) +
                 getSymbol(permsTbl[name].trusted) +
                 getSymbol(permsTbl[name].privileged) +
                 getSymbol(permsTbl[name].certified);
    var tp = getType(target);
    types['' + tp].push(name);
    permissions[name] = { 'target': target, apps: [] };
  }
}

function addApps() {
  var proccessApp = function(dir, err, files) {
    if (err) {
      console.log('Error proccessing Gaia Apps:' + err);
      return;
    }
    files.forEach(function(file) {
      var manifestDir = path.join(dir, file, 'manifest.webapp');
      try {
        var manifest = JSON.parse(fs.readFileSync(manifestDir));
        apps[manifest.name] = [];
        for (var perm in manifest.permissions) {
          if (permissions.hasOwnProperty(perm)) {
            apps[manifest.name].push(perm);
            permissions[perm].apps.push(manifest.name);
          } else {
            apps[manifest.name].push(config.show.appPermError + perm);
          }
        }
      } catch (e) {
        console.log('Error accesing ' + manifestDir + ':' + e);
      }
    });
  };

  config.gaiaAppsDir.forEach(function(dir) {
    try {
      var files = fs.readdirSync(dir);
      proccessApp(dir,null,files);
    } catch(e) {
      console.error('Error proccessing Gaia Apps ['  + dir + ']. ' + e);
    }
  });
}

function writeCSVHeaders(wStream) {
  var sep = config.csv.sep;
  var headOne = sep;
  var headTwo = sep;

  var elems2Lines = function (name, perms) {
    if (perms.length > 0) {
      headOne += name;
      for (var i = 0, l = perms.length; i < l; i++) {
        headOne += sep;
      }
      headTwo += perms.join(sep);
      headTwo += sep;
    }
  };
  //Write first blank line
  wStream.write(sep + EOL);
  for (var i = 0, l = Object.keys(types).length; i < l; i++) {
    elems2Lines(config.show['' + i], types['' + i]);
    sortedPerms = sortedPerms.concat(types['' + i]);
  }
  wStream.write(headOne + EOL);
  wStream.write(headTwo + EOL);
}

function writeCSVBody(wStream) {
  var sep = config.csv.sep;
  var line;
  for (var app in apps) {
    line = app + sep;
    sortedPerms.forEach(function(perm) {
      if (apps[app].indexOf(perm) >= 0) {
        line += nTables > 1 && permissions[perm].target || config.show.checked;
      }
      line += sep;
    });
    wStream.write(line + EOL);
  }
}

function init (cbk) {
  createPermissionsTableModule(function() {
    cbk && cbk();
  });
}

function generateCsv() {
  var sep = config.csv.sep;
  var wStream = fs.createWriteStream(config.csv.out, {
    'flags': 'w',
    'mode': '0644'
  });
  writeCSVHeaders(wStream);
  writeCSVBody(wStream);
  wStream.end();
}

function Spreadsheets(cnf, tables) {
  nTables = tables || 1;
  config = cnf;
};

Spreadsheets.prototype = {
  getCsv: function() {
    if (!initialized) {
      init(generateCsv);
    } else {
      generateCsv();
    }
  }
};

module.exports = Spreadsheets;
