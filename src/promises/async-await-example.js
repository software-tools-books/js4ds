const fs = require('fs-extra')
const glob = require('glob-promise')

const statPairAsync = async (filename) => {
  const stats = await fs.stat(filename)
  return {filename, stats}
}

const countLines = (text) => {
  return text.split('\n').length
}

const processFiles = async (globpath) => {
  const filenames = await glob(globpath)
  const pairs = await Promise.all(
    filenames.map(f => statPairAsync(f)))
  const filtered = pairs.filter(
    pair => pair.stats.size > 100000)
  const contents = await Promise.all(
    filtered.map(f => fs.readFile(f.filename, 'utf8')))
  const lengths = contents.map(c => countLines(c))
  console.log(lengths)
}

const srcDir = process.argv[2]

processFiles(`${srcDir}/**/*.txt`)
  .catch(e => console.log(e.message))
