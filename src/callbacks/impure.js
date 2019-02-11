const impure = (values) => {
  for (let i in values) {
    values[i] += 1
  }
}
