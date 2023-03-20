const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://1771416:paul2858@cluster0.vbnxpqn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const test = client.db('kdt5').collection('test'); // client.db("스키마 명").collection("테이블명")
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertOne(
      {
        name: 'zack',
        nickName: 'chanho',
      },
      (insertErr, insertResult) => {
        console.log(insertResult);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
      },
    );
  });
});
