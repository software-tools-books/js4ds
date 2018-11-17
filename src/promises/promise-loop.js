const fs = require('fs-extra')

var total_size = 0
var files = ['jane-eyre.txt', 'moby-dick.txt', 'life-of-frederick-douglass.txt']
for (let fileName of files) {
  fs.stat(fileName).then((stats) => {
    total_size += stats.size
  })
}
console.log(total_size)
