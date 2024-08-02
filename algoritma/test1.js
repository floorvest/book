const sentence = 'NEGIE1'

function reverse(str) {
    const stringOnly = str.match(/[a-zA-Z]+/g)
    if (stringOnly.length > 0) {
        const reversed = stringOnly[0].split("").reverse("").join("")
        return str.replace(stringOnly, reversed)
    }

    return str;
}

const reversed = reverse(sentence)

console.log(reversed)