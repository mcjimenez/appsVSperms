'use strict';

var https = require ('https');
var fs = require('fs');
var path = require('path');
var EOL = require('os').EOL;
var PATH_SEP = require('path').sep;

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
  var proccessApp = function(dir, files) {
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
        console.error('Error accesing ' + manifestDir + ': ' + e);
      }
    });
  };

  config.gaiaAppsDir.forEach(function(dir) {
    try {
      var files = fs.readdirSync(dir);
      proccessApp(dir, files);
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
        line += nTables === 1 && permissions[perm].target ||
                config.show.checked;
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
  var colWidth = nTables === 1 && config.xlsx.sheet1.longCellWidth ||
                 config.xlsx.sheet1.shortCellWidth;
  var h1Border = config.xlsx.sheet1.hd1Border;
  var h1Align = config.xlsx.sheet1.hd1Align;
  var h1Font = config.xlsx.sheet1.hd1Font;
  var h2Border = config.xlsx.sheet1.hd2Border;
  var h2BorderLst = config.xlsx.sheet1.hd2BorderLst;
  var h2BorderFst = config.xlsx.sheet1.hd2BorderFst;
  var h2Valign = config.xlsx.sheet1.hd2Valign;
  var h2Align = config.xlsx.sheet1.hd2Align;
  var h2Font = config.xlsx.sheet1.hd2Font;

  sortedPerms = [];
  // First column number is 1 (not 0) and App name is in column 1
  // so first permission column is 2
  var col = 2;
  for (var h1 = 0, l = Object.keys(types).length; h1 < l; h1++) {
    var perms = types['' + h1];
    sortedPerms = sortedPerms.concat(types['' + h1]);
    var shw = config.xlsx['' + h1];
    sheet.set(col, 1, config.show['' + h1]);
    sheet.font(col, 1, h1Font);
    sheet.align(col, 1, h1Align);
    sheet.merge({col: col, row: 1}, {col: (col + perms.length - 1), row: 1});
    sheet.fill(col, 1, config.xlsx.sheet1['' + h1].h1Color);
    var h2Color = config.xlsx.sheet1['' + h1].h2Color;
    for (var h2 = 0, lH2 = perms.length; h2 < lH2; h2++) {
      sheet.width(col + h2, colWidth);
      sheet.set(col + h2, 2, perms[h2]);
      sheet.font(col + h2, 2, h2Font);
      sheet.valign(col + h2, 2, h2Valign);
      sheet.align(col + h2, 2, h2Align);
      sheet.rotate(col + h2, 2, 90);
      sheet.border(col + h2, 2,
        h2 === 0 ? h2BorderFst: h2 === perms.length - 1 ? h2BorderLst: h2Border);

      sheet.fill(col + h2, 2, h2Color);
      sheet.border(col + h2, 1, h1Border);
    }
    if (h1 < l - 1) {
      col += types['' + h1].length;
    }
  }
}

function fillXLSXBody1(sheet) {
  var row = 3;
  var maxAppLength = 0;
  var checked = nTables === 2 && config.show.checked || undefined;

  var border = config.xlsx.sheet1.bdyBorder;
  var align = config.xlsx.sheet1.bdyAlign;
  var font = config.xlsx.sheet1.bdyFont;

  for (var app in apps) {
    if (app.length > maxAppLength) {
      maxAppLength = app.length;
    }
    sheet.set(1, row, app);
    for (var i = 0, l = sortedPerms.length; i < l; i++) {
      sheet.border(i + 2, row, border);
      if (apps[app].indexOf(sortedPerms[i]) >= 0) {
        sheet.set(i + 2, row,
                  checked || permissions[sortedPerms[i]].target);
        sheet.font(i + 2, row, font);
        sheet.align(i + 2, row, align);
      }
    };
    row += 1;
  }
  sheet.width(1, maxAppLength + config.xlsx.txtOverflow);
}

function fillXLSXHead2(sheet) {
  var maxColWidth = 0;

  var border = config.xlsx.sheet2.hdBorder;
  var align = config.xlsx.sheet2.hdAlign;
  var font =  config.xlsx.sheet2.hdFont;
  var color = config.xlsx.sheet2.hdColor;
  for (var i = 0, l = Object.keys(types).length - 1; i < l; i++) {
    if (config.show['' + i].length > maxColWidth) {
      maxColWidth = config.show['' + i].length;
    }
    sheet.set(i + 2, 1, config.show['' + i]);
    sheet.font(i + 2, 1, font);
    sheet.border(i + 2, 1, border);
    sheet.align(i + 2, 1, align);
    sheet.fill(i + 2, 1, color);
  }

  for (i = 0; i < l; i++) {
    sheet.width(i + 2, maxColWidth + config.xlsx.txtOverflow);
  }
}

function fillXLSXBody2(sheet) {
  var row = 2;
  var maxPrmLength = 0;
  var permissions = prmTable.permissionsTable;

  var border = config.xlsx.sheet2.bdyBorder;
  var align = config.xlsx.sheet2.bdyAlign;
  var hdFont =  config.xlsx.sheet2.hdFont;
  var bdyFont =  config.xlsx.sheet2.bdyFont;
  var bdyColor = config.xlsx.sheet2.bdyColor;

  for (var prm in permissions) {
    if (prm.length > maxPrmLength) {
      maxPrmLength = prm.length;
    }
    sheet.set(1, row, prm);
    sheet.font(1, row, hdFont);
    sheet.fill(1, row, bdyColor);
    sheet.set(2, row, getSymbol(permissions[prm].app, true));
    sheet.set(3, row, getSymbol(permissions[prm].trusted, true));
    sheet.set(4, row, getSymbol(permissions[prm].privileged, true));
    sheet.set(5, row, getSymbol(permissions[prm].certified, true));
    sheet.align(2, row, align);
    sheet.align(3, row, align);
    sheet.align(4, row, align);
    sheet.align(5, row, align);
    sheet.border(1, row, border);
    sheet.border(2, row, border);
    sheet.border(3, row, border);
    sheet.border(4, row, border);
    sheet.border(5, row, border);
    sheet.font(2, row, bdyFont);
    sheet.font(3, row, bdyFont);
    sheet.font(4, row, bdyFont);
    sheet.font(5, row, bdyFont);
    row += 1;
  }
  sheet.width(1, (maxPrmLength + config.xlsx.txtOverflow));
}

function generateXlsx() {
  var xlsx = config.xlsx;
  fs.unlink(xlsx.path + PATH_SEP + xlsx.name, function (err) {
    if (err) {
      console.log('Previous version of excel file not found. ' + err);
    }
  });

  var excelbuilder = require('msexcel-builder');
  var workbook = excelbuilder.createWorkbook(xlsx.path,
                                             xlsx.name);
  var sheet1 = workbook.createSheet(xlsx.sheet1.name,
                                    Object.keys(permissions).length + 1,
                                    Object.keys(apps).length + 2);

  fillXLSXHead1(sheet1);
  fillXLSXBody1(sheet1);

  if (nTables === 2) {
    var sheet2 = workbook.createSheet(xlsx.sheet2.name, 6,
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
