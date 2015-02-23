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
      hd1Border: {top: 'double', bottom: 'thin', left: 'double', right: 'double'},
      hd1font: {name: 'Calibri', sz: '13', family: '2', scheme: 'minor'},
      hd2Valign: 'bottom',
      hd2Align: 'center',
      hd2Border: {bottom: 'double'},
      hd2BorderFst: {left: 'double', bottom: 'double'},
      hd2BorderLst: {right: 'double', bottom: 'double'},
      hd2font: {name: 'Calibri', sz: '12', family: '2', scheme: 'minor'},
      bdyAlign: 'center',
      bdyBorder: {left: 'thin', right: 'thin', bottom: 'thin'},
      bdyfont: {name: 'Calibri', sz: '9', family: '2', scheme: 'minor'},
      '0': {
        'h1Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '02'},
        'h2Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '02'}
      },
      '1': {
        'h1Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '03'},
        'h2Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '04'}
      },
      '2': {
        'h1Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '02'},
        'h2Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '02'}
      },
      '3': {
        'h1Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '03'},
        'h2Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '04'}
      },
      '4': {
        'h1Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '02'},
        'h2Color': {'type': 'solid', 'fgColor': '55', 'bgColor': '02'}
      }
    },
    sheet2: {
      name: 'permsVSWay',
      hdAlign: 'center',
      hdBorder: {left: 'thin', top: 'double', right: 'thin', bottom: 'double'},
      bdyAlign: 'center',
      bdyBorder: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
      hdFont: {name: 'Calibri', sz: '13', family: '2', scheme: 'minor'},
      bdyFont: {name: 'Calibri', sz:'10', family:'2', scheme:'minor'},
      hdColor: {'type': 'solid', 'fgColor': '64', 'bgColor': '7'},
      bdyColor: {'type': 'solid', 'fgColor': '5', 'bgColor': '3'}
    },
    txtOverflow: 2
  }
};

module.exports = Config;