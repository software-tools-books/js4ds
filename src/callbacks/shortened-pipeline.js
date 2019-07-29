const pipeline = (current, operations) => {
  for (let op of operations) {
    current = op(current)
  }
  return current
}
