const values = [0, 1, '', 'text', undefined, null, [], [2, 3]]
for (let element of values) {
  if (element) {
    console.log(element, 'of type', typeof element, 'is truthy')
  } else {
    console.log(element, 'of type', typeof element, 'is falsy')
  }
}
