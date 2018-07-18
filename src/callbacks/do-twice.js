const doTwice = (action) => {
  action()
  action()
}

const hello = () => {
  console.log('hello')
}

doTwice(hello)
