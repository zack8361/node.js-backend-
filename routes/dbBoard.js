const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인 할수 있는 미들웨어.
const isLogin = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.send('로그인 해주세요.<br><a href="/login">로그인 페이지로 이동</a>');
  }
};

// 게시판 페이지 호출
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_board', {
      ARTICLE,
      articleCounts,
      userId: req.session.userId,
    });
  });
});

// 글쓰기 페이지 호출
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

// 실제 글 작성하기.
router.post('/write', (req, res) => {
  console.log('왔니?');
  console.log(req.body);
  if (req.body.title && req.body.content) {
    boardDB.writeArticle(req.body, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 쓰기 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다,');
    throw err;
  }
});

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID값을 가지는 게시글이 없습니다@@');
      err.statusCode = 50;
      throw err;
    }
  });
});

// 글 수정하기.
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        console.log('1231231');
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    throw err;
  }
});

// 글 삭제하기.
router.delete('/delete/:id', isLogin, (req, res) => {
  if (req.params.id) {
    boardDB.deleteArticle(req.params.id, (data) => {
      if (data.affectedRows >= 1) {
        res.send('삭제완료');
      } else {
        const err = new Error('삭제 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  }
});

module.exports = router;
