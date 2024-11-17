function solution(s) {
  let change = 0;
  let remove = 0;
  while (s.length !== 1) {
    change++;
    let str = "";
    for (const a of s) {
      if (a !== "0") str += a;
      else remove++;
    }
    s = str.length.toString(2);
  }
  return [change, remove];
}
