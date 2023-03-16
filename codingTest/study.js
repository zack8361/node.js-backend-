const solution = (n) => {
  const answer = n - 1;
  for (let i = 2; i <= answer; i++) {
    if (answer % i === 0) {
      return i;
    }
  }
};

console.log(solution(10));
