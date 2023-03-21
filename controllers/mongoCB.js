const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://1771416:paul2858@cluster0.vbnxpqn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// deleteOne z쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // client.db("스키마 명").collection("테이블명")
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//     test.insertMany(
//       [
//         { name: '이찬호', age: 26 },
//         { name: 'loppy', age: 25 },
//         { name: '똥', age: 24 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         test.deleteMany(
//           { age: { $gte: 25 } },
//           (deleteManyErr, deleteManyResult) => {
//             console.log(deleteManyResult);
//           },
//         );
//       },
//     );
//   });
// });

// update query
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // client.db("스키마 명").collection("테이블명")
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//     test.insertMany(
//       [
//         { name: '이찬호', age: 26 },
//         { name: 'loopy', age: 25 },
//         { name: '똥', age: 24 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         test.updateMany(
//           { age: { $gte: 24 } },
//           { $set: { name: '5살 이상인 찡꼴라들' } },
//           (updateErr, updateResult) => {
//             if (updateErr) throw updateErr;
//             console.log(updateResult);
//           },
//         );
//       },
//     );
//   });
// });

// findOne
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // client.db("스키마 명").collection("테이블명")
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//     test.insertMany(
//       [
//         { name: '이찬호', age: 26 },
//         { name: 'loopy', age: 25 },
//         { name: '똥', age: 24 },
//         { name: '똥', age: 24 },
//         { name: '똥', age: 24 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         const findCursor = test.find({ name: '똥' });
//         console.log(findCursor);
//         findCursor.toArray((toArrErr, toArrData) => {
//           if (toArrErr) throw toArrErr;
//           console.log(toArrData);
//         });
//       },
//     );
//   });
// });

// 실습
client.connect((err) => {
  const test = client.db('kdt5').collection('member'); // client.db("스키마 명").collection("테이블명")
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertMany(
      [
        { name: '이찬호', age: 26 },
        { name: '림정혁', age: 26 },
        { name: '리류릴', age: 27 },
        { name: '김민정', age: 25 },
        { name: '송민선', age: 29 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);
        test.insertOne(
          {
            name: '최인영',
            age: 25,
          },
          (insertOneErr, insertOneResult) => {
            if (insertOneErr) throw insertOneErr;
            console.log(insertOneResult);
            test.deleteOne(
              {
                name: '림정혁',
              },
              (deleteOneErr, deleteOneResult) => {
                if (deleteOneErr) throw deleteOneErr;
                console.log(deleteOneResult);
                test.updateOne(
                  { name: '리류릴' },
                  { $set: { name: '홍성범', age: 30 } },
                  (updateOneErr, updateOneResult) => {
                    if (updateOneErr) throw updateOneErr;
                    console.log(updateOneResult);
                    const findAll = test.find({ age: { $gte: 25 } });
                    console.log(findAll);
                    findAll.toArray((toArrErr, toArrData) => {
                      if (toArrErr) throw toArrErr;
                      console.log(toArrData);
                    });
                  },
                );
              },
            );
          },
        );
      },
    );
  });
});
// client.connect((err) => {
//   const test = client.db('kdt5').collection('member1'); // client.db("스키마 명").collection("테이블명")
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//     test.insertMany(
//       [
//         { name: '이찬호', age: 26 },
//         { name: '박성재', age: 28 },
//         { name: '김정혁', age: 26 },
//         { name: '이유림', age: 27 },
//         { name: '최인영', age: 25 },
//       ],
//       (insertManyErr, insertManyData) => {
//         if (insertManyErr) throw insertManyErr;
//         console.log(insertManyData);
//         test.insertOne(
//           {
//             name: '송민영',
//             age: 23,
//           },
//           (insertOneErr, insertOneData) => {
//             if (insertOneErr) throw insertOneErr;
//             console.log(insertOneData);
//             test.deleteOne(
//               {
//                 name: '김정혁',
//               },
//               (deleteOneErr, deleteOneData) => {
//                 if (deleteOneErr) throw deleteOneErr;
//                 console.log(deleteOneData);
//                 test.updateOne(
//                   { name: '박성재' },
//                   { $set: { name: '박박박', age: 100 } },
//                 );
//               },
//             );
//           },
//         );
//       },
//     );
//   });
// });
