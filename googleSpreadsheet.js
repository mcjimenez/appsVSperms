'use strict';

 var Spreadsheet = require('edit-google-spreadsheet');

Spreadsheet.load({
    debug: true,
    //spreadsheetName: 'node-edit-spreadsheet',
    spreadsheetId: '13qt-TCNkUdfT8Mtb666fRxbMQ_PDhmZAtGvcbexn1eU',
//    worksheetName: 'appxperm',
    worksheetName: 'Sheet1',
    // Choose from 1 of the 4 authentication methods:

    //    1. Username and Password
//    username: 'my-name@google.email.com',
//    password: 'my-5uper-t0p-secret-password',

    // OR 2. OAuth
//    oauth : {
//      email: 'my-name@google.email.com',
//      keyFile: 'my-private-key.pem'
//    },

    // OR 3. Static Token
    accessToken: {
      type: 'Bearer',
      token: 'my-generated-token'
    },

    // OR 4. Dynamic Token
//    accessToken: function(callback) {
      //... async stuff ...
//      callback(null, token);
//    }
  }, function sheetReady(err, spreadsheet) {
console.log("CJC sheetReady READY!");
    //use speadsheet!
      if(err) throw err;

      spreadsheet.receive(function(err, rows, info) {
        if(err) throw err;
        console.log("Found rows:", rows);
      // Found rows: { '3': { '5': 'hello!' } }
      });

  });

module.exports = Spreadsheet;