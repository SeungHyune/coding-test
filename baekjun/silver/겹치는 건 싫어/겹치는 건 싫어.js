const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,K], [...arr]] = input.map(a => a.split(" ").map(Number));

// 같은 원소가 K 개 이하인 최장 연속 부분 수열의 길이를 구해야 함

function solution(N, K) {
    let [answer, cont] = [0, 0]
    let [left, right] = [0, 0];
    
    let map = new Map();

    while(right < N) {
        const mapCheck = map.has(arr[right]);
    
		    // 이미 arr[right]의 수가 존재하는 경우
        if(mapCheck) {
            map.set(arr[right], map.get(arr[right]) + 1);

            if (map.get(arr[right]) > K) {
                if(answer < cont) answer = cont;
								
								// arr[right]와 같은 arr[left]를 찾을 때까지 left 값을 1씩 증가시켜가며 값을 찾는다.
                const rightValue = arr[right];
                while(left < N) {
                    const leftValue = arr[left];
                    
                    map.set(arr[left], map.get(arr[left]) - 1);
                    if(map.get(arr[left]) === 0) map.delete(arr[left]);
                    
                    left++;
                    
                    if(leftValue === rightValue) {
                        break;
                    }
                }
                
                cont = right - left;
            }
            right++;
            cont++;
        } else {
        // arr[right]가 한 번도 등록되지 않은 경우
            map.set(arr[right], 1);
            right++;
            cont++;
        }
    }

		// 모든 반복문을 순회하고 난 후 cont 길이가 더 긴 경우
		// 같은 수열이 K 개를 넘는 경우가 없을 수도 있다.
    if(answer < cont) answer = cont

    return answer
}

console.log(solution(N,K))