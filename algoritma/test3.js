const input = ['xc', 'dz', 'bbb', 'dz']  
const query = ['bbb', 'ac', 'dz']  

function findQuery() {
    const res = []
    for(var x in query) {
        const q = query[x]
        let total = 0

        input.forEach((v) => {
            if (v == q) {
                total++
            }
        })

        res.push(total)
    }

    return res
}

console.log(findQuery())