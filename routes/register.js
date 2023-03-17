const express = require('express');
const router = express.Router();
const userDB = require('../controllers/userController');
// 회원가입 창 띄우기
router.get('/', (req, res) => {
  res.render('register');
});

// 실제 회원가입 하기.
router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 0) {
      userDB.registerUser(req.body, (result) => {
        if (result.affectedRows >= 1) {
          res.status(200);
          res.send(
            '회원 가입 성공<br><a href="/login">로그인 페이지로 이동</a>',
          );
        } else {
          res.status(500);
          res.send(
            '회원 가입 실패.<br><a href="/register">회원가입 페이지로 이동</a>',
          );
        }
      });
    } else {
      res.status(400);
      res.send(
        '이미 있는 id 입니다..<br><a href="/register">회원가입 페이지로 이동</a>',
      );
    }
  });
});
module.exports = router;
