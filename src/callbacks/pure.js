const pure = (values) -> {
  result = []
  for (let v of values) {
    result.push(v + 1)
  }
  return result
}
