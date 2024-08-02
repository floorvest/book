const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

function calculate(m) {
    let factorOne = 0
    let factorTwo = 0
    const n = m.length

    for (let i = 0; i < n; i++) {
        factorOne += m[i][i]
        factorTwo += m[i][n - i - 1]
    }

    return Math.abs(factorOne - factorTwo)
}

console.log(calculate(matrix)); 