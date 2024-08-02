const sentence = "Saya sangat senang mengerjakan soal algoritma"

function longest(str) {
    const strings = str.split(" ")
    let longest = ""
    for(var x in strings) {
        const str1 = strings[x]
        if (longest.length < str1.length) {
            longest = str1
        }
    }

    return longest
}

const longestStr = longest(sentence)

console.log(`${longestStr} : ${longestStr.length} character`)