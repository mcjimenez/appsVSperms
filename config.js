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
    '0': 'HOSTED',
    '1': 'TH',
    '2': 'PRIVILEGED',
    '3': 'CERTIFIED',
    '4': 'NONE',
    appPermError: '****'
  },
  gaiaAppsDir: ['/home/cjc/dev/gaiaDEV/apps', '/home/cjc/dev/gaiaDEV/outoftree_apps'],
  csv: {
    out: '/home/cjc/tmp/dani/pruebas/appsVSperms.csv',
    sep: ';'
  },
  xlsx: {
    path: '/home/cjc/tmp/dani/pruebas',
    name: 'miAppsVSperms.xlsx',
    sheet1Name: 'appsVSperms',
    sheet2Name: 'permsVSWay',
    '0': {
      'h1_fgColor': '00000000',
      'h1_bgColor': 'FFFF0000',
      'h2_fgColor': 'red',
      'h2_bgColor': 'yellow'
    },
    '1': {
      'h1_fgColor': 'FFFF0000',
      'h1_bgColor': '00000000',
      'h2_fgColor': '8',
      'h2_bgColor': '64'
    },
    '2': {
      'h1_fgColor': '155187089',
      'h1_bgColor': '20',
      'h2_fgColor': '8',
      'h2_bgColor': '64'
    },
    '3': {
      'h1_fgColor': '50',
      'h1_bgColor': '100',
      'h2_fgColor': '8',
      'h2_bgColor': '64'
    },
    '4': {
      'h1_fgColor': '8',
      'h1_bgColor': '64',
      'h2_fgColor': '8',
      'h2_bgColor': '64'
    }
 }
};

module.exports = Config;