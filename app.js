// node-modules 에 설치 되어있는 기본 패키지 세팅.
const express = require('express');
const cors = require('cors');

// bodyParser 설정
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

// cors 적용하기.
app.use(cors());
// 뷰 엔진 적용하기.
app.set('view engine', 'ejs');
// 스태틱 폴더 설정하기.
app.use(express.static('public'));

// body-parser 을 선언하는 이유 -> form 태그 내에 데이터를 이용하기 위해
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// index.js 라우터 설정 -> index.js 는 뒷주소 생략가능.
const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');

// mainRouter = localhost:4000/의 주소 부터 시작.
app.use('/', mainRouter);

// userRouter = localhost:4000/users의 주소 부터 시작.
app.use('/users', userRouter);

// boardRouter = localhost:4000/board 의 주소 부터 시작.
app.use('/board', boardRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status);
});

// 서버를 실행시키는 코드 -> 최 하단에 위치시킨다.
app.listen(PORT, () => {
  console.log(`서버는 ${PORT} 에서 실행 중입니다.`);
});
