const fs = require('fs-extra')

const statPairAsync = async (filename) => {
  var stats = await fs.stat(filename)
  return {filename, stats}
}

statPairAsync('moby-dick.txt').then((white_whale) => console.log(white_whale.stats))
