# **D-Day**

[문제 링크](https://www.acmicpc.net/problem/1308)

### 문제설명

캠프에 오게 된 송유진은 캠프가 너무 지루해서 오늘로부터 캠프가 끝날 때 까지 며칠이나 남았는지 알아보고 싶었다. 그런데 캠프는 비상식적으로 길지도 몰라서 (윤년을 포함할지도 모른다) 손으로 하나하나 세기에는 힘들어 보였다.

더욱 정확한 계산을 위해, 유진이는 윤년이 정해지는 기준을 찾아보았고, 그것은 다음과 같았다.

- 서력기원 연수가 4로 나누어떨어지는 해는 우선 윤년으로 한다. (2004년, 2008년, …)
- 100으로 나누어떨어지는 해는 평년으로 한다. (2100년, 2200년, …)
- 400으로 나누어떨어지는 해는 다시 윤년으로 한다. (1600년, 2000년, …)

그런데 캠프가 너무 길 경우, 사춘기인 유진이는 캠프에 무단으로 빠질지도 모른다.

<br/>

### 입력

첫째 줄에 오늘의 날짜가 주어지고, 두 번째 줄에 D-Day인 날의 날짜가 주어진다. 날짜는 연도, 월, 일순으로 주어지며, 공백으로 구분한다. 입력 범위는 1년 1월 1일부터 9999년 12월 31일 까지 이다. 오늘의 날짜는 항상 D-Day보다 앞에 있다.

<br/>

### 출력

오늘부터 D-Day까지 x일이 남았다면, "D-"를 출력하고 그 뒤에 공백 없이 x를 출력한다. 만약 캠프가 천년 이상 지속된다면 (오늘이 y년 m월 d일이고, D-Day가 y+1000년 m월 d일과 같거나 늦다면) 대신 "gg"를 출력한다. 오늘이 2월 29일인 경우는 주어지지 않는다.

<br/>

### 예제 입력

```jsx
// 예제 입력1
2008 12 27
2009 1 22

// 예제 출력1
D-26
```

<br/>

### 📕 문제 포인트

1. `monthDay` 라는 1월부터 12월까지의 일수를 담은 배열을 만들어 1년의 총 일수를 `yearDay` 변수에 저장했습니다.
2. 그후 `(년도 - 1) * yearDay` 를 통해 구하려는 년도 이전까지의 총 일수를 각각 저장해주었습니다.
   - 이후 윤년인 경우 2월 달이 29일 이기 때문에 윤년을 계산하여 더해주었습니다.
3. 마지막으로 `month-1` 까지의 일수와 `day` 를 더해 년도의 월,일 일수를 구해주었습니다.
   - 이때 해당 년도가 윤년이면서 2월을 넘는 경우 `day` 에 1일을 추가해주었습니다.
4. 최종적으로 `dday일수 - current일수`를 통해 결괏값을 구할 수 있었습니다.
5. 예외 처리의 경우 `ddayYear-currentYear` 값이 1000보다 크거나 `ddayYear-currentYear` 값이 1000인 경우 `ddayMonth >= currentDay && ddayDay >= currentDay` 이면 1000년 이상이기 때문에 `gg` 를 출력하고 함수를 종료해주었습니다.

### 📝 문제 풀이

```js
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
```
