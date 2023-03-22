const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href ="/"> 메인 페이지로 이동</a>';

const getAllArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const allArticleCursor = board.find({});
    const ARTICLE = await allArticleCursor.toArray();
    console.log(ARTICLE);
    res.render('db_board', {
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const writeArticle = async (req, res) => {
  console.log('gsadfasdf');
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    await board.insertOne(newArticle);

    res.redirect('/dbBoard');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message + UNEXPECTED_MSG);
  }
};

const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('db_board_modify', { selectedArticle });
  } catch (error) {
    console.error(error);
  }
};

const updateArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    // { name: '구슬기' },
    // { $set: { name: '김민정', age: 25 } },
    await board.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { TITLE: req.body.title, CONTENT: req.body.content } },
    );
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
  }
};

const deleteArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    await board.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json('삭제성공.');
    // res.redirect('/db_board');
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  updateArticles,
  deleteArticles,
};

// db connect 모듈 불러오기.
// const connection = require('./dbConnect');

// const boardDB = {
// 모든 게시글 가져오기 기능.
// getAllArticles: (cb) => {
//   connection.query('SELECT * FROM mydb.board', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     cb(data);
//   });
// },

// 글 쓰기. -> 게시글 추가하기.

// writeArticle: (newArticle, cb) => {
//   connection.query(
//     `INSERT INTO mydb.board (USERID,TITLE,CONTENT) values
// ('${newArticle.userId}','${newArticle.title}', '${newArticle.content}');`,
//     (err, data) => {
//       if (err) throw err;
//       cb(data);
//     },
//   );
// },
// 특정 ID 값을 게시글 찾기.
//   getArticle: (id, cb) => {
//     console.log('@@@@@@@@@@@@@@@@@@@@@@@', id);
//     connection.query(
//       `SELECT * FROM mydb.board WHERE ID_PK = '${id}';`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글을 수정하는 컨트롤러.
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb.board SET TITLE = '${modifyArticle.title}',
//       CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 삭제.
//   deleteArticle: (id, cb) => {
//     connection.query(
//       `DELETE FROM mydb.board WHERE ID_PK = '${id}';`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;
