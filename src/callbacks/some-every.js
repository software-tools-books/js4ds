const data = ['this', 'is', 'a', 'test']
console.log('some longer than 3:',
            data.some((x) => { return x.length > 3 }))
console.log('all longer than 3:',
            data.every((x) => { return x.length > 3 }))
