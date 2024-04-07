const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,X], [...arr]] = input.map(a => a.split(" ").map(Number));

let answer = Number.MIN_SAFE_INTEGER;
let [left, point] = [0, 0];
let [day, sum, record] = [0, 0, 0];

while(point < N) {
		// 연속된 X 일 보다 day가 작은 경우
		// 현재 point를 sum에 더해 줍니다. (이후 point를 1 증가시켜 줍니다.)
    if(day < X ) {
        sum += arr[point++];
        day++;
    }
    
	  // day === X가 같다면 현재까지 누적한 방문자 수와 sum을 비교합니다.
	  // 이때, sum이 크다면 새로운 방문자 수가 기록된 것이기 때문에 record를 1로 갱신해 줍니다.
	  // answer === sum이 같다면 방문자 수가 동일한 기록이므로 record 값만 1 증가시켜 줍니다.
    if(day === X) {
        if(answer < sum) {
            answer = sum;
            record = 1;
        } else if(answer === sum){
            record++;
        }
        
        // 이후 left 값을 누적 합에서 빼주고 left를 1 증가시켜 줍니다.
        // left가 빠졌기 때문에 day는 1 감소시켜 줍니다.
        sum -= arr[left++];
        day--;
    }
}

if(answer === 0) {
    return console.log("SAD")
}
console.log(answer)
console.log(record)