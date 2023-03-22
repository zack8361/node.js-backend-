const express = require('express');

const router = express.Router();

// controller 에서 export 해준거 받아온다.
const { registerUser } = require('../controllers/userController');

// 1. 회원가입 페이지로 이동
router.get('/', (req, res) => {
  res.render('register');
});

// 2. 실제 회원 가입 처리하기. -> 기능은 controller 에서 진행.
router.post('/', registerUser);

module.exports = router;

// 실제 회원가입 하기.
// router.post('/', async (req, res) => {
//   const duplicateUser = await userDB.userCheck(req.body.id);
//   if (!duplicateUser) {
//     const registerResult = await userDB.registerUser(req.body);
//     if (registerResult) {
//       res.send('성공');
//     } else {
//       res.send('실패');
//     }
//   } else {
//     res.send('실패');
//   }
// });
