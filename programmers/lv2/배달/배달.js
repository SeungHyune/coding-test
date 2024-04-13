function solution(N, road, K) {
  let graph = Array.from({length: N+1}, () => []);
  
  for(const [a,b,c] of road) {
      graph[a].push([b,c]);
      graph[b].push([a,c]);
  }
  
  let ch = Array.from({length: N + 1}, () => 0);
  
  let queue = [];
  for(let i = 0 ; i < graph[1].length; i++) {
      let [b,c] = graph[1][i];
      if((ch[b] === 0 || ch[b] > c) && c <= K) {
          ch[b] = c;
          queue.push([b, ch[b]]);
      }
  }
  
  
  
  while(queue.length > 0) {
      let [b, c] = queue.shift();
      for(let i = 0 ; i < graph[b].length; i++) {
          let [bb, cc] = graph[b][i];
          if(c + cc <= K) {
              if(ch[bb] === 0 || ch[bb] > cc+c) { 
                  ch[bb] = cc+c;
              }
              queue.push([bb, ch[bb]])
          }
          
      }
  }
  
  return ch.filter(v => v > 0).length;
}