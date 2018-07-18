const bound = 3

const clip = (values) => {
  let result = []
  for (let v in values) {
    if (v <= bound) {
      result.push(v)
    }
  }
  return result
}

module.exports = {
  clip: clip
}
