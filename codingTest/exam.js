const solution = (grade) => {
  let sort = grade.sort();
  console.log(sort);
  let max = sort[sort.length - 1];

  let cnt = 1;
  let arr = [cnt];
  let count = 1;
  for (let i = 1; i < grade.length; i++) {
    if (max === grade[i]) {
      arr.push(cnt);
      max == grade[i];
      count++;
    } else if (max > grade[i]) {
      arr.push(cnt + count);
    }
  }

  return arr;
};

let grade = [2, 2, 1];
console.log(solution(grade));
