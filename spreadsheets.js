'use strict';

var https = require ('https');
var fs = require('fs');
var path = require('path');
var EOL = require('os').EOL;

var ExcelBuilder = null;

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

function getSymbol(value, lngFmt) {
  switch(value) {
    case prmTable.ALLOW_ACTION:
      return lngFmt && config.show.allowLng || config.show.allow;
      break;
    case prmTable.PROMPT_ACTION:
      return lngFmt && config.show.promptLng || config.show.prompt;
      break;
    case prmTable.DENY_ACTION:
      return lngFmt && config.show.denyLng || config.show.deny;
      break;
    default:
      return lngFmt && config.show.unknownLng || config.show.unknown;
      return config.show.unknown;
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
      console.error('Error proccessing Gaia Apps:' + err);
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
        console.error('Error accesing ' + manifestDir + ':' + e);
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
        line += nTables === 1 && permissions[perm].target || config.show.checked;
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

function fillXLSXHead1(sheet) {
  sortedPerms = [];
  // First column number is 1 (not 0) and App name is in column 1
  // so first permission column is 2
  var col = 2;
  for (var h1 = 0, l = Object.keys(types).length; h1 < l; h1++) {
    var perms = types['' + h1];
    sortedPerms = sortedPerms.concat(types['' + h1]);
    var shw = config.xlsx['' + h1];
    sheet.set(col, 1, config.show['' + h1]);
    sheet.merge({col: col, row: 1}, {col: (col + perms.length - 1), row: 1});
    sheet.fill(col, 1, {fgColor: shw.h1_fgColor, bgColor: shw.h1_bgColor});
    for (var h2 = 0, lH2 = perms.length; h2 < lH2; h2++) {
      sheet.set(col + h2, 2, perms[h2]);
      sheet.valign(col + h2, 2, 'bottom');
      sheet.rotate(col + h2, 2, 90);
      sheet.fill(col + h2, 2, {fgColor: shw.h2_fgColor, bgColor: shw.h2_bgColor});
      //sheet.border(col + h2, 2, {left:'medium',top:'medium',right:'thin', bottom:'medium'});
    }
    if (h1 < l - 1) {
      col += types['' + h1].length;
    }
  }
}

function fillXLSXHead2(sheet) {
  for (var i = 0, l = Object.keys(types).length; i < l; i++) {
    sheet.set(i + 2, 1, config.show['' + i]);
  }
}

function fillXLSXBody1(sheet) {
  var row = 3;
  var checked = nTables === 2 && config.show.checked || undefined;

  for (var app in apps) {
    sheet.set(1, row, app);
    for (var i = 0, l = sortedPerms.length; i < l; i++) {
      sheet.border(i + 2, row, {left:'thin',top:'thin',right:'thin', bottom:'thin'});
      if (apps[app].indexOf(sortedPerms[i]) >= 0) {
        sheet.set(i + 2, row,
                  checked || permissions[sortedPerms[i]].target);
      }
    };
    row += 1;
  }
}

function fillXLSXBody2(sheet) {
  var row = 2;
  var permissions = prmTable.permissionsTable;
  for (var prm in permissions) {
    sheet.set(1, row, prm);
    sheet.set(2, row, getSymbol(permissions[prm].app, true));
    sheet.set(3, row, getSymbol(permissions[prm].trusted, true));
    sheet.set(4, row, getSymbol(permissions[prm].privileged, true));
    sheet.set(5, row, getSymbol(permissions[prm].certified, true));
    sheet.border(1, row, {left:'thin',top:'thin',right:'thin', bottom:'thin'});
    sheet.border(2, row, {left:'thin',top:'thin',right:'thin', bottom:'thin'});
    sheet.border(3, row, {left:'thin',top:'thin',right:'thin', bottom:'thin'});
    sheet.border(4, row, {left:'thin',top:'thin',right:'thin', bottom:'thin'});
    sheet.border(5, row, {left:'thin',top:'thin',right:'thin', bottom:'thin'});
    row += 1;
  }
}

function generateXlsx() {
  var excelbuilder = require('msexcel-builder');

  var xlsx = config.xlsx;
  var workbook = excelbuilder.createWorkbook(xlsx.path,
                                             xlsx.name);


  var sheet1 = workbook.createSheet(xlsx.sheet1Name,
                                    Object.keys(permissions).length + 1,
                                    Object.keys(apps).length + 2);

  fillXLSXHead1(sheet1);
  fillXLSXBody1(sheet1);

  if (nTables === 2) {
    var sheet2 = workbook.createSheet(xlsx.sheet2Name, 6,
                             Object.keys(prmTable.permissionsTable).length + 1);
    fillXLSXHead2(sheet2);
    fillXLSXBody2(sheet2);
  }

  workbook.save(function(ok) {
    if (!ok) {
      workbook.cancel();
    } else {
      console.log('Excel file created');
    }
  });
}

function Spreadsheets(cnf, tables) {
  nTables = tables || 1;
  config = cnf;
};

Spreadsheets.prototype = {
  createCsv: function() {
    if (!initialized) {
      init(generateCsv);
    } else {
      generateCsv();
    }
  },
  createXlsx: function() {
    if (!initialized) {
      init(generateXlsx);
    } else {
      generateXlsx();
    }
  }
};

module.exports = Spreadsheets;
