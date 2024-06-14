// 장르 별로 가장 많이 재생된 노래 두 개만 출력함

// 1. 많이 재생된 장르 우선
// 2. 장르 내에서 많이 재생된 노래 우선
// 3. 장르 내에서 재생 횟수가 같으면 고유 번호가 낮은 노래 우선

function solution(genres, plays) {
  const answer = [];

  const playsMap = new Map();
  const genresMap = new Map();

  for (let i = 0; i < genres.length; i++) {
    const name = genres[i];
    const getGenres = genresMap.get(name) || [];
    getGenres.push([i, plays[i]]);

    playsMap.set(name, (playsMap.get(name) || 0) + plays[i]);
    genresMap.set(name, getGenres);
  }

  const playsArr = [...playsMap];
  playsArr.sort((a, b) => b[1] - a[1]);

  for (const [key, value] of playsArr) {
    const genresArr = genresMap.get(key);
    let temp = 0;
    genresArr.sort((a, b) => b[1] - a[1]);
    for (const [index] of genresArr) {
      if (temp === 2) break;

      answer.push(index);
      temp++;
    }
  }

  return answer;
}
