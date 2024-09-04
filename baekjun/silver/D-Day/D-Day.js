const fs = require("fs");
const arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.split(" ").map(Number));

const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const [currentYear, currentMonth, currentDay] = arr[0];
const [ddayYear, ddayMonth, ddayDay] = arr[1];

const yearDay = monthDay.reduce((prev, cur) => prev + cur, 0);

let currentLeapYearDay = currentDay + yearDay * (currentYear - 1);
let ddayLeapYearDay = ddayDay + yearDay * (ddayYear - 1);
const currentMonthDay = calculateMonthDay(currentYear, currentMonth);
const ddayMonthDay = calculateMonthDay(ddayYear, ddayMonth);

if (ddayYear - currentYear > 1000) {
  console.log("gg");
  return;
} else if (
  ddayYear - currentYear === 1000 &&
  currentMonth <= ddayMonth &&
  currentDay <= ddayDay
) {
  console.log("gg");
  return;
}

currentLeapYearDay += calculateLeapYearDay(currentYear);
ddayLeapYearDay += calculateLeapYearDay(ddayYear);

function calculateLeapYearDay(year) {
  let day = 0;

  for (let i = 1; i < year; i++) {
    if (i % 400 === 0) {
      day++;
    } else if (i % 100 === 0) {
      continue;
    } else if (i % 4 === 0) {
      day++;
    }
  }

  return day;
}

function calculateMonthDay(year, month) {
  let day = 0;

  for (let i = 0; i < month - 1; i++) {
    day += monthDay[i];
  }

  if (month > 2 && (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))) {
    day++;
  }

  return day;
}

const result =
  ddayLeapYearDay + ddayMonthDay - (currentLeapYearDay + currentMonthDay);
console.log(`D-${result}`);
