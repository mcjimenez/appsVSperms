'use strict';

var Config = {
  permissionsModule : {
    url: 'https://raw.githubusercontent.com/mozilla/gecko-dev/master/dom/apps/PermissionsTable.jsm',
    startStr: 'this.PermissionsTable = ',
    endStr: '};',
    auxNodeModule: '/tmp/permissions.js'
  },
  show: {
    error: 'E',
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
    '5': 'Error',
    appPermError: '****'
  },
  gaiaAppsDir: ['/home/mcjimenez/dev/gaia/apps', '/home/mcjimenez/dev/gaia/outoftree_apps'],
  csv: {
    out: '/home/mcjimenex/tmp/dani/pruebas/appsVSperms.csv',
    sep: ';'
  },
  xlsx: {
    path: '/media/sf_TEMP/excel',
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
      bdyColorFst: {'type': 'solid', 'fgColor': { rgb: 'FFDDD9C4' }, 'bgColor': { rgb: 'FFFFFFFF' }},
      '0': {
        'h1Color': {'type': 'solid', 'fgColor': { rgb: 'FF9BBB59' }, 'bgColor': { rgb: 'FFFFFFFF' }},
        'h2Color': {'type': 'solid', 'fgColor': { rgb: 'FFCCFFCC' }, 'bgColor': { indexed: '64' }}
      },
      '1': {
        'h1Color': {'type': 'solid', 'fgColor': { rgb: 'FF7981BD' }, 'bgColor': { rgb: 'FFFFFFFF' }},
        'h2Color': {'type': 'solid', 'fgColor': { rgb: 'FFBBDEE8' }, 'bgColor': { indexed: '64' }}
      },
      '2': {
        'h1Color': {'type': 'solid', 'fgColor': { rgb: 'FFE26B0A' }, 'bgColor': { rgb: 'FFFFFFFF' }},
        'h2Color': {'type': 'solid', 'fgColor': { rgb: 'FFFABF8F' }, 'bgColor': { indexed: '64' }}
      },
      '3': {
        'h1Color': {'type': 'solid', 'fgColor': { rgb: 'FF632523' }, 'bgColor': { rgb: 'FFFFFFFF' }},
        'h2Color': {'type': 'solid', 'fgColor': { rgb: 'FFE6B8B7' }, 'bgColor': { indexed: '64' }}
      },
      '4': {
        'h1Color': {'type': 'solid', 'fgColor': { rgb: 'FFE26B0A' }, 'bgColor': { rgb: 'FFFFFFFF' }},
        'h2Color': {'type': 'solid', 'fgColor': { rgb: 'FFFABF8F' }, 'bgColor': { indexed: '64' }}
      },
      '5': {
        'h1Color': {'type': 'solid', 'fgColor': { rgb: 'FF595959' }, 'bgColor': { rgb: 'FFFFFFFF' }},
        'h2Color': {'type': 'solid', 'fgColor': { rgb: 'FFD9D9D9' }, 'bgColor': { indexed: '64' }}
      }
    },
    sheet2: {
      name: 'permsVSWay',
      hdAlign: 'center',
      hdBorder: {left: 'thin', top: 'double', right: 'thin', bottom: 'double'},
      bdyAlign: 'center',
      bdyBorder: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
      hdFont: {name: 'Calibri', sz: '12', family: '2', scheme: 'minor', color:{ rgb: 'FF000000' }},
      bdyFont: {name: 'Calibri', sz:'10', family:'2', scheme:'minor', color:{ rgb: 'FFFFFFFF' }},
      hdColor: {'type': 'solid', 'fgColor': { rgb: 'FFE26B0A' }, 'bgColor': { indexed: '64' }},
      bdyColor: {'type': 'solid', 'fgColor': { rgb: 'FFDDD9C4' }, 'bgColor': { indexed: '64' }}
    },
    txtOverflow: 2
  }
};

module.exports = Config;
