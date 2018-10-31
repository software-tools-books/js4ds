['a', 'b', 'c'].forEach(val => {
  console.log(`about to do setImmediate for ${val}`)
  setImmediate(() => console.log(`inside immediate handler for ${val}`))
})
