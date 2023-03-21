const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: '이찬호',
    content: '멋쟁이',
  },
  {
    title: '박성재',
    content: '멋쟁이x',
  },
];

// (get) -> 글 전체 목록이 보이는 페이지.
router.get('/', (req, res) => {
  const articleCounts = ARTICLE.length;
  res.render('board', { ARTICLE, articleCounts });
});

// (get) -> 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// (post) -> 실제 글쓰기 처리
router.post('/write', (req, res) => {
  if (req.body) {
    if (req.body.title && req.body.content) {
      const newBoard = {
        title: req.body.title,
        content: req.body.content,
      };
      ARTICLE.push(newBoard);
      res.redirect('/board');
    } else {
      const err = new Error('쿼리 등록이 잘못되었습니다.');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('데이터가 입력되지 않았습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// (get) -> 글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title,
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

// (post) -> 글 수정 처리
router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title,
    );
    if (arrIndex !== -1) {
      ARTICLE[arrIndex].title = req.body.title;
      ARTICLE[arrIndex].content = req.body.content;
      res.redirect('/board');
    }
  }
});

// 글 삭제 요청
router.delete('/delete/:title', (req, res) => {
  console.log('삭제 요청 들어옴');
  // 삭제 요청을 한 제목의 배열을 찾아서 삭제.
  const arrIndex = ARTICLE.findIndex(
    (artice) => artice.title === req.params.id,
  );
  ARTICLE.splice(arrIndex, 1);
  res.send('삭제 요청되었다.');
});
module.exports = router;
