const values = [false, true, 0, 1, '', 'text', undefined, null, [], [2, 3]]
for (let v of values) {
  if (v) {
    console.log(`${v} of type ${typeof v} is truthy`)
  }
  else {
    console.log(`${v} of type ${typeof v} is falsy`)
  }
}
