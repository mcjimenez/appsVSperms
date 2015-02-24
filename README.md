# appsVSperms

## Prerequisites

appsVSperm needs the msexcel-builder package

```
$ npm install
```

msexcel-builder node package has some bugs fixed in this project. So until the fixes are added upstream, the package.json is pointing to my own fork.

appsVSperm needs the FirefoxOS gaia repo cloned

```
$ cd <directory where_gaia_will_be_cloned>
$ git clone https://github.com/mozilla-b2g/gaia.git
```

## Usage

Edit config.js for configure the app.

For the minimum configuration set the correct values to:
- gaiaAppsDir: Directories where find apps to process
- csv.out: Fullname csv output file (only necessary if you want to generate a csv file)
- xlsx.path: Dirname of the xlsx output file
- xlsx.name: Basename of the xlsx output file
- xlsx.sheet1.name: Sheet 1 name
- xlsx.sheet2.name: Sheet 2 name

To generate the spreadsheet:

```
$ node main.js [options]
```

options:

   --h | --help: Show help

   --oneSheet | --one | one: Generate all the information in one sheet.
      each cell contains four letters which symbolise App, Trusted, Privileged,
      and Certified access way with the values D (for deny), P (for prompt) and
      A (for allow)

  --twoSheet | --two | two: Generate two sheets:
        appsVsPermissions and permissionsVSgrandPermissionMode

  --csv | csv: output file in CSV format

  --xlsx | xlsx: output file in XLSX format


The default behavior is to generate two sheets and use XLSX format.
