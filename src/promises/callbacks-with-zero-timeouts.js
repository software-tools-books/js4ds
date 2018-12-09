const values = [1000, 1500, 500]
console.log('starting...')
values.forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, 0)
})
console.log('...finishing')
