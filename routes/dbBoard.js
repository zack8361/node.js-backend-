const express = require('express');
// const boardDB = require('../controllers/boardController');

const multer = require('multer');
// 파일 시스템 호출
const fs = require('fs');

const { getAllArticles } = require('../controllers/boardController');
const { writeArticle } = require('../controllers/boardController');
const { getArticle } = require('../controllers/boardController');
const { updateArticles } = require('../controllers/boardController');
const { deleteArticles } = require('../controllers/boardController');

const router = express.Router();

// 파일 업로드 설정 -> 상대경로로 해야함.
const dir = './uploads';
const storage = multer.diskStorage({
  // 어느 폴더에 파일을 지정할것인지.
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});
const limits = {
  fileSize: 1024 * 1024 * 2, // 2mg 까지 업로드가능.
};

const upload = multer({ storage, limits });
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// 로그인 확인 할수 있는 미들웨어.
const isLogin = (req, res, next) => {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.send('로그인 해주세요.<br><a href="/login">로그인 페이지로 이동</a>');
  }
};
// board main 화면 송출.
router.get('/', isLogin, getAllArticles);

// 글쓰기 페이지 호출
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

// 실제 글쓰기
router.post('/write', isLogin, upload.single('img'), writeArticle);

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, getArticle);

// 실제 글 수정하기.
router.post('/modify/:id', isLogin, upload.single('img'), updateArticles);

// 글 삭제하기.
router.delete('/delete/:id', isLogin, deleteArticles);

// 게시판 페이지 호출
// router.get('/', isLogin, (req, res) => {
//   boardDB.getAllArticles((data) => {
//     const ARTICLE = data;
//     const articleCounts = ARTICLE.length;
//     res.render('db_board', {
//       ARTICLE,
//       articleCounts,
//       userId: req.session.userId,
//     });
//   });
// });

// 글쓰기 페이지 호출
// router.get('/write', isLogin, (req, res) => {
//   res.render('db_board_write');
// });

// // 실제 글 작성하기.
// router.post('/write', (req, res) => {
//   if (req.body.title && req.body.content) {
//     const newArticle = {
//       userId: req.session.userId,
//       title: req.body.title,
//       content: req.body.content,
//     };

//     boardDB.writeArticle(newArticle, (data) => {
//       console.log(data);
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 쓰기 실패');
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다,');
//     throw err;
//   }
// });

// // 글 수정 모드로 이동
// router.get('/modify/:id', isLogin, (req, res) => {
//   boardDB.getArticle(req.params.id, (data) => {
//     if (data.length > 0) {
//       res.render('db_board_modify', { selectedArticle: data[0] });
//     } else {
//       const err = new Error('해당 ID값을 가지는 게시글이 없습니다@@');
//       err.statusCode = 50;
//       throw err;
//     }
//   });
// });

// // 글 수정하기.
// router.post('/modify/:id', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     boardDB.modifyArticle(req.params.id, req.body, (data) => {
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 수정 실패');
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다!');
//     throw err;
//   }
// });

// // 글 삭제하기.
// router.delete('/delete/:id', isLogin, (req, res) => {
//   if (req.params.id) {
//     boardDB.deleteArticle(req.params.id, (data) => {
//       if (data.affectedRows >= 1) {
//         res.send('삭제완료');
//       } else {
//         const err = new Error('삭제 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   }
// });

module.exports = router;
