const fs = require('fs-extra')
fs.stat('moby-dick.txt').then((stats) => console.log(stats.size))
