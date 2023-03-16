const solution = (grade) => {
  let score = new Array(grade.length);
  let result = new Array(grade.length);

  for (let i = 0; i < grade.length; i++) {
    score[i] = [Number(grade[i]), Number(i)];
  }
  score.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    } else {
      return b[0] - a[0];
    }
  });
  console.log(score);
  let rank = 0;
  let lastScore = -1;
  let same = 0;

  for (let i = 0; i < grade.length; i++) {
    if (lastScore !== score[i][0]) {
      rank += same + 1;
      same = 0;
    } else {
      same++;
    }
    result[score[i][1]] = rank;

    lastScore = score[i][0];
  }
  return result;
};

const grade = [3, 2, 1, 2];
console.log(solution(grade));
