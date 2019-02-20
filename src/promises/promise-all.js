const fs = require('fs-extra')

let total_size = 0
const files = ['jane-eyre.txt', 'moby-dick.txt',
               'life-of-frederick-douglass.txt']
Promise.all(files.map(f => fs.stat(f))).
  then(stats => stats.reduce((total, s) => {return total + s.size}, 0)).
  then(console.log)
