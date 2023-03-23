const mongoose = require('mongoose');

// const { MONGO_DB_URI } = process.env;

const MONGO_DB_URI =
  'mongodb+srv://1771416:paul2858@cluster0.vbnxpqn.mongodb.net/?retryWrites=true&w=majority';
const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      dbName: 'kdt5',
      useNewUrlParser: true,
    });
    console.log('MONGOOSE 접속 성공!');
    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.error('연결이 끊어졌다. 연결을 재시도 합니다.');
      connect();
    });
  } catch (error) {
    console.error(error);
  }
};

connect();

module.exports = connect;
