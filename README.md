# appsVSperms

## Usage

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

## Prerequisites

appsVSperm needs msexcel-builder package

```
$ npm install msexcel-builder
```

appsVSperm needs gaia Repo

```
$ cd <directory where_gaia_will_be_cloned>
$ git clone https://github.com/mozilla-b2g/gaia.git
```

