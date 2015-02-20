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
    unknow: 'U',
    '0': 'HOSTED',
    '1': 'TH',
    '2': 'PRIVILEGED',
    '3': 'CERTIFIED',
    '4': 'NONE',
    appPermError: '****'
  },
  gaiaAppsDir: ['/home/cjc/dev/gaiaMASTER/apps', '/home/cjc/dev/gaiaMASTER/outoftree_apps'],
  csv: {
    out: '/tmp/appsVSpermissions.csv',
    sep: ';'
  },
  google: {
    url: 'https://docs.google.com/spreadsheets/d/189dkn0MevWmF98pt3naumGy0XBDrahr8XLpihImwSXk/edit?usp=sharing'
  }
};

module.exports = Config;