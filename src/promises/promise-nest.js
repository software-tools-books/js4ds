const fs = require('fs-extra')

let total_size = 0
new Promise((resolve, reject) => {
  fs.stat('jane-eyre.txt').then((jeStats) => {
    fs.stat('moby-dick.txt').then((mdStats) => {
      fs.stat('life-of-frederick-douglass.txt').then((fdStats) => {
        resolve(jeStats.size + mdStats.size + fdStats.size)
      })
    })
  })
}).then((total) => console.log(total))
