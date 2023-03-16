const solution = (p) => {
  let cnt = 0;

  for (let i = 0; i < p.length; i++) {
    let current = i;
    while (true) {
      if (p[current] === '>') {
        if (p[current + 1] === '<') {
          break;
        }
        current++;
      } else if (p[current] === '<') {
        if (p[current - 1] === '>') {
          break;
        }
        current--;
      } else {
        cnt++;
        break;
      }
    }
  }
  return cnt;
};

const p = '<<><<';
console.log(solution(p));
