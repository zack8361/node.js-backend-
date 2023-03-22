const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://yulim516:qwer1234@cluster0.tlox8mr.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    const test = client.db('kdt5').collection('test');
    await test.deleteMany({});
    await test.insertMany([
      { name: '김민정', age: 25 },
      { name: '이유림', age: 26 },
      { name: '이찬호', age: 26 },
      { name: '김정혁', age: 25 },
      { name: '송민선', age: 29 },
    ]);
    await test.insertOne({ name: '구슬기', age: 30 });
    await test.deleteOne({ name: '김민정' });
    await test.updateOne(
      { name: '구슬기' },
      { $set: { name: '김민정', age: 25 } },
    );
    const findCursor = test.find({ age: { $gte: 25 } });
    const dataArr = await findCursor.toArray();
    console.log(dataArr);
  } catch (err) {
    console.error(err);
  }
}
main();
