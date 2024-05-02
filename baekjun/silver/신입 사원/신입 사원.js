const fs = require("fs")
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n")
input = input.map(a => a.split(" ").map(Number))

const [T] = input.shift()
const arr = []

for(let i = 0 ; i < T ; i++) {
    const [N] = input.shift()
    const array = input.splice(0, N)
    
    arr.push([N, array])
}

arr.forEach((newComer) => {
    const [N, rankArr] = newComer
    let result = 1 
    let index = 0
    
    rankArr.sort((a,b) => a[0] - b[0])
    
    for(let i = 1 ; i < N ; i++) {
        const [prevA, prevB] = rankArr[index]
        const [curA, curB] = rankArr[i]
        
        if(prevB > curB) {
            result++
            index = i
        }
    }
    
    console.log(result)
})