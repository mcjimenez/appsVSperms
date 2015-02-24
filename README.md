# appsVSperms

## Prerequisites

appsVSperm needs msexcel-builder package

```
$ npm install
```

This node package has some bugs fixed in this project. To install it:

```
$ npm run postInstall
```

appsVSperm needs gaia Repo

```
$ cd <directory where_gaia_will_be_cloned>
$ git clone https://github.com/mozilla-b2g/gaia.git
```

## Usage

Edit config.js for configure the app.

For minimum configuration set the correct values to:
- gaiaAppsDir: Directories where find apps to process
- csv.out: Fullname csv output file (only necessary if you want to generate a csv file)
- xlsx.path: Dirname of xlsx output file
- xlsx.name: Basename of xlsx output file
- xlsx.sheet1.name: Sheet 1 name
- xlsx.sheet2.name: Sheet 2 name

```
$ node main.js [options]
```

options:

   --h | --help: Show help

   --oneSheet | --one | one: Show information in one table
      each cell contains four letters which symbolise App, Trusted, Privileged,
      and Certified access way with the values D (for deny), P (for prompt) and
      A (for allow)

  --twoSheet | --two | two: Show two tables:
        appsVsPermissions and permissionsVSgrandPermissionMode

  --csv | csv: output file in CSV format

  --xlsx | xlsx: output file in XLSX format


All information in two table and XLSX format by default
