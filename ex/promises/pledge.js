class Pledge {
  constructor (action) {
    this.actionCallbacks = []
    this.errorCallback = () => {}
    action(this.onResolve.bind(this), this.onReject.bind(this))
  }

  then (thenHandler) {
    this.actionCallbacks.push(thenHandler)
    return this
  }

  catch (errorHandler) {
    this.errorCallback = errorHandler
    return this
  }

  onResolve (value) {
    let storedValue = value
    try {
      this.actionCallbacks.forEach((action) => {
        storedValue = action(storedValue)
      })
    } catch (error) {
      this.actionCallbacks = []
      this.onReject(error)
    }
  }

  onReject (error) {
    this.errorCallback(error)
  }
}

new Pledge((resolve, reject) => {
  console.log('1. top of action callback with double then and a catch')
  setTimeout(() => {
    console.log('1. about to call resolve callback')
    resolve('1. initial result')
    console.log('1. after resolve callback')
  }, 0)
  console.log('1. end of action callback')
}).then((value) => {
  console.log(`1. first then with "${value}"`)
  return '1. first then value'
}).then((value) => {
  console.log(`1. second then with "${value}" about to throw`)
  throw new Error(`1. exception from second then with "${value}"`)
}).catch((error) => {
  console.log(`1. in catch block with "${error}`)
})

new Pledge((resolve, reject) => {
  console.log('2. top of action callback with deliberate error')
  setTimeout(() => {
    console.log('2. about to reject on purpose')
    reject('2. error on purpose')
  }, 0)
}).then((value) => {
  console.log(`2. should not be here with "${value}"`)
}).catch((error) => {
  console.log(`2. in error handler with "${error}"`)
})
