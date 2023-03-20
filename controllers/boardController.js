// db connect 모듈 불러오기.
const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기 기능.
  getAllArticles: (cb) => {
    connection.query('SELECT * FROM mydb.board', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },

  // 글 쓰기. -> 게시글 추가하기.
  writeArticle: (newArticle, cb) => {
    connection.query(
      `INSERT INTO mydb.board (USERID,TITLE,CONTENT) values ('${newArticle.userId}','${newArticle.title}', '${newArticle.content}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID 값을 게시글 찾기.
  getArticle: (id, cb) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@', id);
    connection.query(
      `SELECT * FROM mydb.board WHERE ID_PK = '${id}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID를 가지는 게시글을 수정하는 컨트롤러.
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  deleteArticle: (id, cb) => {
    connection.query(
      `DELETE FROM mydb.board WHERE ID_PK = '${id}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = boardDB;
