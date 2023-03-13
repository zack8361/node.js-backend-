// 기본 express 설정

const express = require('express');

// router 설정.

const router = express.Router();

// ejs로 날릴 데이터
const user = '이찬호';
// localhost:4000/users/ 의 주소부터 시작.
router.get('/', (req, res) => {
  res.render('users', { user });
});

// router : 모듈로 빼준다.
module.exports = router;
