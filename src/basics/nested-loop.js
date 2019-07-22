const nested = [['northwest', 'northeast'],
                ['southwest', 'southeast']]
for (let outer of nested) {
  for (let inner of outer) {
    console.log(inner)
  }
}
