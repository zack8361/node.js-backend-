// db connect 불러오기

// const connection = require('./dbConnect');

const mongoClient = require('./mongoConnect');

// 회원가입 에러메세지
// 에러 메세지 500
const UNEXPECTED_MSG =
  '알수 없는 문제 발생 <br><a href ="/register">회원 가입으로 이동 </a>';
// 중복되는 유저 있음.
const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href ="/register">회원 가입으로 이동 </a>';
// 회원가입 성공 메세지
const SUCCESS_MSG =
  '회원 가입 성공!.<br><a href ="/login">로그인 으로 이동 </a>';

// 로그인 에러메세지
const UNEXPECTED_MSG_LOGIN =
  '알수 없는 문제 발생 <br><a href ="/login">로그인으로 이동 </a>';

// 로그인 실패 메세지
const LOGIN_FAIL_MSG =
  '아이디가 잘못되었습니다!.<br><a href ="/login">로그인 으로 이동 </a>';
const PASSWORD_FAIL_MSG =
  '아이디가 잘못되었습니다!.<br><a href ="/login">로그인 으로 이동 </a>';

// 1. 회원 가입 기능.
const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    // 중복되는 유저 있나 찾기.
    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    // 중복되는 유저 없으면 body 값으로 회원가입 시켜라.
    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG);

    // catch 구문
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG); // 서버 에러
  }
};

// 2. 로그인 기능
const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    // id 값이 있는 비밀번호 가져왔는데 만약없다면?
    const findUser = await user.findOne({ id: req.body.id });
    if (!findUser) return res.status(400).send(LOGIN_FAIL_MSG);
    // 비밀번호 틀린다면?
    if (findUser.password !== req.body.password)
      return res.status(400).send(PASSWORD_FAIL_MSG);

    // 위에 두개의 if 문이 안걸려서 return 이 안된다면?
    req.session.login = true;
    req.session.userId = req.body.id;
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 30,
      httpOnly: true,
      singed: true,
    });
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG_LOGIN);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

// const userDb = {
//   userCheck: async (userID) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       const findUser = await user.findOne({ id: userID });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   // userCheckSQL: (userId, cb) => {
//   //   connection.query(
//   //     `SELECT * FROM mydb.user WHERE USER_ID = '${userId}';`,
//   //     (err, data) => {
//   //       if (err) {
//   //         throw err;
//   //       }
//   //       cb(data);
//   //     },
//   //   );
//   // },
//   // registerUser: (newUser, cb) => {
//   //   connection.query(
//     `INSERT INTO mydb.user (USER_ID,PASSWORD) VALUES ('${newUser.id}','${newUser.password}')`,
//   //     (err, data) => {
//   //       if (err) {
//   //         throw err;
//   //       }
//   //       cb(data);
//   //     },
//   //   );
//   // },
//   registerUser: async (newUser) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       await user.insertOne(newUser);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

// module.exports = userDb;
