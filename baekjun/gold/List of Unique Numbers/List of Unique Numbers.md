# **List of Unique Numbers**

[문제 링크](https://www.acmicpc.net/problem/13144)

### 문제설명

길이가 N인 수열이 주어질 때, 수열에서 연속한 1개 이상의 수를 뽑았을 때 같은 수가 여러 번 등장하지 않는 경우의 수를 구하는 프로그램을 작성하여라.

<br>

### 입력

첫 번째 줄에는 수열의 길이 N이 주어진다. (1 ≤ N ≤ 100,000)

두 번째 줄에는 수열을 나타내는 N개의 정수가 주어진다. 수열에 나타나는 수는 모두 1 이상 100,000 이하이다.

<br>

### 출력

조건을 만족하는 경우의 수를 출력한다.

<br>

### 예제

```jsx
// 예제 1
5
1 2 3 1 2

// 예제 출력 1
12
```

<br>

### 📕 문제 포인트

1. 반복문을 두번 돌리면 쉽게 풀 수 있는 문제이나 시간 초과가 걸려서 실패한다.
2. O(N)으로 문제를 풀어야 하기에 Map 메서드를 활용하여 중복 체크를 했고 중복이 나오기 전까지 sum, right를 1씩 증가 시켜주었다.
3. 만약 동일한 숫자가 발견 되거나 right 값이 N이상이 되는 경우에는 left 값을 증가 시켜주었고 지금까지 누적된 sum 값을 answer에 누적해주었다. (추가로 left 값을 map 메서드에서 제거 시켜주었다.)
4. left 값이 바뀐 처음에는 right - left를 하여 현재까지 left부터 right 이전까지의 수를 미리 sum에 초깃값으로 설정해주었고 이후 다시 right부터 중복된 값이 나올때까지 2번을 반복해주었다.

### 1차 풀이 (시간 초과)

```jsx
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = input[0];
const arr = input.slice(1)[0].split(" ").map(Number);

function solution() {
    let answer = 0;

    for(let left = 0 ; left < N ; left++) {
        const map = new Map();
        let right = left;
        let sum = 0;
        
        while(right < N) {
            const check = map.has(arr[right]);
            
            if(!check) {
                map.set(arr[right], 1);
                sum++;
                right++;
            } else {
                break;
            }
        }
        
        answer += sum;
    }
    
    return answer;
}

console.log(solution());
```

### 2차 풀이
```js
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = input[0];
const arr = input.slice(1)[0].split(" ").map(Number);

function solution() {
    let [answer, sum] = [0, 0];
    let [left, right] = [0, 0];
    let flag = true;
    
    const map = new Map();
    
    while(left < N) {
			  // 중복된 숫자 체크
        const mapCheck = map.has(arr[right]);
        
        // left 값이 바뀐 뒤 초깃값 세팅
        if(flag) {
            flag = false;
            
            // left가 0인 경우 음수가 나오므로 처음에는 패스해 준다.
            if(left > 0) {
                sum = right - left;
            }
        }
        
        // map 메서드에 중복된 숫자가 있거나 right 값이 배열을 벗어난 경우
        if(mapCheck || right >= N) {
            map.delete(arr[left]);
            left++;
            flag = true;
            answer += sum;
        } else {
        // 중복된 숫자가 없는 경우
            map.set(arr[right], 1);
            right++;
            sum++;
        }
    }
    
    
    return answer;
}

console.log(solution());
```