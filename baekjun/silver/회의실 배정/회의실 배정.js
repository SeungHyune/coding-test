// [시작 시간, 끝나는 시간]
// 회의가 겹치지 않고 사용할 수 있는 회의의 최대 개수를 찾자
// 회의는 시작하면 중간에 중단될 수 없으며 한 회의가 끝나야 다음 회의가 시작할 수 있다
// 회의는 시작 시간 끝나는 시간이 같을 수 있다. (이 경우 시작하자마자 끝나는 것)

const fs = require("fs")
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n")

function solution() {
    const N = input.shift();
    const arr = input.map(a => a.split(" ").map(Number));
    
    // 회의 종료 시간을 기준으로 정렬했다.
    // 만약 회의 종료 시간이 같다면 시작 시간이 빠른 경우가 우선시 되도록 정렬했다.
    arr.sort((a,b) => {
        if(a[1] === b[1]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    })
    
    // 정렬된 첫 회의는 무조건 시작함으로 첫 회의 개수를 담았다.
    let meeting = 1;
    let endTime = arr[0][1];
    
    for(let i = 1 ; i < N ; i++) {
        const startTime = arr[i][0];
        
        // 현재 진행 중인 회의의 끝나는 시간과 다음 회의의 시작 시간이 같거나 더 큰 경우에 바로 회의를 시작했다.
        if(endTime <= startTime) {
            endTime = arr[i][1];
            meeting++;
        }
    }
    
    return meeting;
}

console.log(solution());