// db connect 불러오기

const connection = require('./dbConnect');

const userDb = {
  userCheck: (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USER_ID = '${userId}';`,
      (err, data) => {
        if (err) {
          throw err;
        }
        cb(data);
      },
    );
  },
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USER_ID,PASSWORD) VALUES ('${newUser.id}','${newUser.password}')`,
      (err, data) => {
        if (err) {
          throw err;
        }
        cb(data);
      },
    );
  },
};

module.exports = userDb;
