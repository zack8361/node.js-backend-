// 1. 배열 구조 분해전 ->  기존 문법
// const arr = [1, 2, 3];
// const one = arr[0];
// console.log(one);

// 2. 배열 구조 분해 할당 -> es6 강요되는 문법.
// const arr = [1, 2, 3];
// const [one, two, three] = arr;
// console.log(one,two,three);

// 3. 구조분해 할당으로  해당 연도 해당 월 해당 일 split(""); 으로 배열만들기.
// const today = new Date();
// console.log(today);

// // substring 0~10 까지만 받기
// const formmatedDate = today.toISOString().substring(0, 10);
// console.log(formmatedDate);

// const [year, month, date] = formmatedDate.split('-');
// console.log(`${year}년 ${month}월 ${date}일`);

// // 객체 는 키 에 있는 변수명이 동일해야한다. 순서 상관 x
// const obj = {
//   firstName: '이',
//   lastName: '찬호',
// };
// const { firstName, lastName } = obj;
// console.log(firstName, lastName);

// const person = {
//   name: '이찬호',
//   age: '26',
//   hobby: {
//     ball: 'soccer',
//     run: 'maraton',
//   },
// };
// const {
//   hobby: { ball, run },
// } = person;

// console.log(ball, run);

// 배열 선언.
// const arr = [1, 2, 3, 4, 5, 6];
// // 배열의 형태로 출력
// console.log(arr);
// // 배열의 값만 형태로 출력
// console.log(...arr);

// const obj = {
//   user: '이찬호',
//   status: '취함',
// };

// console.log(obj);
// console.log({ ...obj });

// 객체 안에 객체가 들어있는 형태
// const zackData = {
//   user: '이찬호',
//   age: 26,
// };
// const zackInfo = {
//   nickName: '바보',
//   status: '숙취',
// };
// const zack = {
//   ...zackData,
//   ...zackInfo,
// };
// console.log(zack);

// // 전개 연산자로 두 배열 합치기.
// const arr1 = [1, 2, 3];
// const arr2 = ['4', '5', '6'];
// const merge = [...arr1, ...arr2];
// console.log(merge);

// 1. 객체 나머지 연산자. // name 빼고 나머지를 나머지 연산자로 사용하기.
// const zack2 = {
//   name: '이찬호',
//   gender: 'M',
//   nickName: '천재',
//   email: 'zack6353@naver.com',
// };
// const { name, ...restInfo } = zack2;
// console.log(restInfo);
// console.log(name);

// // 2. 배열 나머지 연산자
// const arr3 = [1, 2, 3, 4, 5, 6];
// const [one, ...rest] = arr3;
// console.log(one);
// console.log(rest);

// 3.실제 백엔드에서 쓰일법한 나머지 연산자.

const spread = (first, second, ...rest) => {
  console.log(first);
  console.log(second);
  console.log(rest);
};

spread(1, 2, 3, 4, 5, 6, 7);
