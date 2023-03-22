const express = require('express');

const router = express.Router();
// const userDB = require('../controllers/userController');

const { loginUser } = require('../controllers/userController');

// logout
router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

// login 창으로 이동.
router.get('/', (req, res) => {
  res.render('login');
});

// login 구현하기 (mongo)
router.post('/', loginUser);

// // login 구현하기.(post)
// router.post('/', (req, res) => {
//   userDB.userCheck(req.body.id, (data) => {
//     if (data.length >= 1) {
//       if (data[0].PASSWORD === req.body.password) {
//         console.log(req.body.PASSWORD);
//         req.session.login = true;
//         req.session.userId = req.body.id;

//         // 로그인 쿠키 발행 -> 쿠키 키 : user, value = req.body.id
//         res.cookie('user', req.body.id, {
//           maxAge: 1000 * 10,
//           httpOnly: true,
//           signed: true,
//         });
//         res.status(200);
//         res.redirect('/dbBoard');
//       } else {
//         res.status(400);
//         res.send(
//           '비밀번호가 다릅니다. <br><a href = "/login">로그인 페이지로 이동</a>',
//         );
//       }
//     } else {
//       res.status(400);
//       res.send(
//         '해당 id 가 존재하지 않습니다.<br><a href="/register">회원가입 페이지로 이동</a>',
//       );
//     }
//   });
// });

module.exports = router;
