const fs = require('fs-extra')
const glob = require('glob-promise')

const srcDir = process.argv[2]

const statPair = (filename) => {
  return new Promise((resolve, reject) => {
    fs.stat(filename)
      .then(stats => resolve({filename, stats}))
      .catch(error => reject(error))
  })
}

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => statPair(f))))
  .then(files => console.log('glob + Promise.all(...)', files))
  .catch(error => console.error(error))
