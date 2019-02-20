const fs = require('fs-extra')
const glob = require('glob-promise')

const srcDir = process.argv[2]

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => fs.stat(f))))
  .then(files => console.log('glob + Promise.all(...)', files))
  .catch(error => console.error(error))
