'use strict';

var Config = {
  permissionsModule : {
    url: 'https://raw.githubusercontent.com/mozilla/gecko-dev/master/dom/apps/PermissionsTable.jsm',
    startStr: 'this.PermissionsTable = ',
    endStr: '};',
    auxNodeModule: '/tmp/permissions.js'
  },
  show: {
    checked: 'X',
    allow: 'A',
    prompt: 'P',
    deny: 'D',
    unknown: 'U',
    allowLng: 'Allow',
    promptLng: 'Prompt',
    denyLng: 'Deny',
    unknownLng: 'Unknown',
    '0': 'Hosted',
    '1': 'Trusted H.',
    '2': 'Privileged',
    '3': 'Certified',
    '4': 'None',
    appPermError: '****'
  },
  gaiaAppsDir: ['/home/cjc/dev/gaiaDEV/apps', '/home/cjc/dev/gaiaDEV/outoftree_apps'],
  csv: {
    out: '/home/cjc/tmp/dani/pruebas/appsVSperms.csv',
    sep: ';'
  },
  xlsx: {
    path: '/tmp',
    name: 'appsVSperms.xlsx',
    sheet1: {
      name: 'appsVSperms',
      shortCellWidth: 4,
      longCellWidth: 6,
      hd1Align: 'center',
      hd1Border: {top: 'double', left: 'thin', right: 'thin'},
      hd1font: {name: 'Calibri', sz: '13', family: '2', scheme: 'minor'},
      hd2Valign: 'bottom',
      hd2Align: 'center',
      hd2Border: {bottom: 'double'},
      hd2font: {name: 'Calibri', sz: '12', family: '2', scheme: 'minor'},
      bdyAlign: 'center',
      bdyBorder: {left: 'thin', right: 'thin', bottom: 'thin'},
      bdyfont: {name: 'Calibri', sz: '9', family: '2', scheme: 'minor'},
      '0': {
        'h1Color': {'type': 'solid', 'fgColor': '60', 'bgColor': '60'},
        'h2Color': {'type': 'solid', 'fgColor': '61', 'bgColor': '8'}
      },
      '1': {
        'h1Color': {'type': 'solid', 'fgColor': '64', 'bgColor': '8'},
        'h2Color': {'type': 'solid', 'fgColor': '65', 'bgColor': '8'}
      },
      '2': {
        'h1Color': {'type': 'solid', 'fgColor': '62', 'bgColor': '8'},
        'h2Color': {'type': 'solid', 'fgColor': '63', 'bgColor': '8'}
      },
      '3': {
        'h1Color': {'type': 'solid', 'fgColor': '64', 'bgColor': '8'},
        'h2Color': {'type': 'solid', 'fgColor': '67', 'bgColor': '8'}
      },
      '4': {
        'h1Color': {'type': 'solid', 'fgColor': '65', 'bgColor': '8'},
        'h2Color': {'type': 'solid', 'fgColor': '66', 'bgColor': '8'}
      }
    },
    sheet2: {
      name: 'permsVSWay',
      hdAlign: 'center',
      hdBorder: {},
      bdyAlign: 'center',
      bdyBorder: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
      hdFont: {name: 'Calibri', sz: '13', family: '2', scheme: 'minor'},
      bdyFont: {name: 'Calibri', sz:'10', family:'2', scheme:'minor'},
      hdColor: {'type': 'solid', 'fgColor': '8', 'bgColor': '64'},
      BdyColor: {'type': 'solid', 'fgColor': '0', 'bgColor': '255'}
    },
    txtOverflow: 2
  }
};

module.exports = Config;