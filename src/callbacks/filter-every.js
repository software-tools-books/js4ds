const data = ['this', 'is', 'a', 'test']
console.log('all longer than 3 start with t',
            data
            .filter((x) => { return x.length > 3 })
            .every((x) => { return x[0] === 't' }))
