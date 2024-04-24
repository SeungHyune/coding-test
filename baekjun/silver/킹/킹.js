// 8*8 정사각형 체크판에 왕의 위치가 주어짐
// 체스판에서 말의 위치는 알파벳,숫자 하나로 이루어져 있음
// 알파벳 - 열 / 숫자 - 행
// 열의 가장 왼쪽 열이 A, 오른쪽 열이 H
// 행은 가장 아래가 1, 가장 위가 8

// 상하좌우 대각선으로 8 방향으로 움직일 수 있음
// 왕이 돌의 위치로 이동하는 경우 돌도 왕이 움직인 방향으로 이동한다.
// 움직였을 때 왕, 돌이 체스판 밖으로 나갈 경우 그 이동은 건너 뛰고 다음 이동을 한다.
// 마지막 왕, 돌의 위치를 구해라

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [K, S, N] = input.shift().split(" ")

const move = {
    R : [0, 1],
    L : [0, -1],
    B: [1, 0],
    T: [-1, 0],
    RT: [-1, 1],
    LT: [-1, -1],
    RB: [1, 1],
    LB: [1, -1]
}

const row = {
    A : 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: 'G',
    7: "H"
}

const column = {
    0: 7,
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
    7: 0
}

const chess = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0));
const [kingR, kingC] = K.split("");
let [KR, KC] = [row[kingR], column[kingC - 1]];
const [stoneR, stoneC] = S.split("");
let [SR, SC] = [row[stoneR], column[stoneC - 1]];

chess[KC][KR] = "K";
chess[SC][SR] = "S";

for(let d = 0 ; d < N ; d++){
    const direction = input[d];
    
    const [DC, DR] = move[direction];

    const kingLocation = [KC+DC, KR+DR];
    const stoneLocation = [SC+DC, SR+DR];

    // 왕이 위치를 벗어난 경우
    if(kingLocation[0] < 0 || kingLocation[1] < 0 ||  kingLocation[0] >= 8 || kingLocation[1] >= 8) continue;
  
    
    // 왕이 돌의 위치로 이동한 경우
    if(kingLocation[0] === SC && kingLocation[1] === SR) {
        // 돌의 위치가 벗어난 경우
        if(stoneLocation[0] < 0 || stoneLocation[1] < 0 || stoneLocation[0] >= 8 || stoneLocation[1] >= 8) continue;
  
        chess[SC][SR] = 0;
        
        chess[stoneLocation[0]][stoneLocation[1]] = "S";
        
        SC = stoneLocation[0];
        SR = stoneLocation[1];    
    }
    
    chess[KC][KR] = 0;
    
    chess[kingLocation[0]][kingLocation[1]] = "K";
    
    KC = kingLocation[0];
    KR = kingLocation[1];
}

console.log(`${row[KR]}${column[KC] + 1}`);
console.log(`${row[SR]}${column[SC] + 1}`);