function solution(bridge_length, weight, truck_weights) {
  const road = [];
  const roadTime = [];
  
  let time = 0;
  while(truck_weights.length > 0 || road.length > 0) {
      for(let i = 0 ; i < roadTime.length ; i++) {
          roadTime[i] += 1;
      }
      
      while(roadTime[0] === bridge_length + 1) {
          road.shift();
          roadTime.shift();
      }
      
      const truck = truck_weights.shift();
      const roadWeights = road.reduce((prev, current) => prev + current, 0);
      
      if(truck) {
          if(roadWeights + truck <= weight && road.length < bridge_length) {
              road.push(truck);
              roadTime.push(1);
          } else {
              truck_weights.unshift(truck);
          }
      }
      
      time++;
  }
  
  return time;
}