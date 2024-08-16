const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("");

const map = new Map();

for (const str of input) {
  map.set(str, (map.get(str) || 0) + 1);
}

let odd = 0;
let str = "";
let lastStr = "";

const mapArr = [...map].sort();

for (const [key, value] of mapArr) {
  if (value % 2 === 1) {
    odd++;
    lastStr += key;
  }

  if (odd === 2) {
    console.log("I'm Sorry Hansoo");
    return;
  }

  let i = Math.floor(value / 2);
  while (i--) {
    str += key;
  }
}

const result = str + lastStr + str.split("").reverse().join("");
console.log(result);
