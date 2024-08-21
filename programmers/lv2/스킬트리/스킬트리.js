function solution(skill, skill_trees) {
  let answer = 0;
  for (const skills of skill_trees) {
    let s = skill.split("");
    let flag = true;
    for (const a of skills) {
      if (s.includes(a)) {
        if (s.shift() !== a) {
          flag = false;
          break;
        }
      }
    }

    if (flag) answer++;
  }
  return answer;
}
