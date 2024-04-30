// 끊어진 기타줄 개수 N, 기타줄 브랜드 M
// 패키지 가격(6게), 낱개 가격(1개)
// 돈의 최소 값을 구해라

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,M], ...arr] = input.map(a => a.split(" ").map(Number))

function solution() {
    let answer = 0;
    let sum = N;
    const sett = arr.map(guitar => guitar[0]);
    const each = arr.map(guitar => guitar[1]);
    
    sett.sort((a,b) => a-b)
    each.sort((a,b) => a-b)
    
    while(sum > 0) {
        // 줄이 6개 이상
        if(sum >= 6) {
            if(sett[0] < each[0] * 6) {
                sum -= 6;
                answer += sett[0];
            } else {
                sum -= 6;
                answer += each[0] * 6;
            }
        } else {
        // 줄이 6개 미만
            if(sett[0] < each[0] * sum) {
                sum = 0;
                answer += sett[0]
            } else {
                answer += each[0] * sum
                sum = 0;
            }
        }
    }
    
    return answer;
}

console.log(solution())