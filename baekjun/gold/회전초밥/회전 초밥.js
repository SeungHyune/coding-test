const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N,D,K,C] = input.shift().split(" ").map(Number);
const arr = input.map(Number);

const map = new Map();
let [left, right] = [0, 0];
let [len, answer, flag] = [0, 0, true];

while(left < N) {
		// 초밥을 K 이상 먹은 후부터 먹은 초밥의 최댓값을 구하는 로직
    if(len >= K) {
		    // 현재 먹은 초밥에 쿠폰 초밥이 있는지 체크한다.
        const coupon = map.has(C) ? 0 : 1;
        // 초밥의 개수 (초밥 개수 + 쿠폰 초밥)
        const count = map.size + coupon;
        
        // K + 1이 나올 수 있는 최댓값이기에 바로 종료 시켜준다.
        if(count === K + 1) return console.log(K + 1);
        
        if(answer < count) {
            answer = count;
        }
    
		    // left 값이 N - K가 되는 순간 한 번만 right 값을 0으로 초기화해주는 로직
        if(left >= N - K && flag) {
            flag = false;
            right = 0;
        }
        
        // arr[left] 초밥 제거, arr[right] 초밥 추가
        map.set(arr[left], map.get(arr[left]) - 1);
        map.set(arr[right], map.get(arr[right]) ? map.get(arr[right]) + 1 : 1);
        
        // arr[left] 초밥이 0인 경우 완전히 제거
        if(map.get(arr[left]) <= 0) {
            map.delete(arr[left]);
        }
        
        left++;
        right++;
    } else {
		    // 초밥을 K 이상 먹을 때까지의 반복문
        map.set(arr[right], map.get(arr[right]) ? map.get(arr[right]) + 1 : 1);
        len++;
        right++;
    }
}

console.log(answer);