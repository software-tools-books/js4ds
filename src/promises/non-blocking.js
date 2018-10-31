const nonBlocking = (callback) => {
  setTimeout(callback, 0)
}

['a', 'b', 'c'].forEach(val => {
  console.log(`about to do nonBlocking for ${val}`)
  nonBlocking(() => console.log(`inside callback for ${val}`))
})
