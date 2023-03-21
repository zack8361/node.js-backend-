const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://1771416:paul2858@cluster0.vbnxpqn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    const test = client.db('kdt5').collection('await');

    // 1. 전체 데이터 한번 삭제.
    const deleteManyResult = await test.deleteMany({});
    // console.log(deleteManyResult);
    if (!deleteManyResult.acknowledged) {
      return '삭제 에러 발생';
    }

    // 2. 여러개 삽입하기.
    const insertManyResult = await test.insertMany([
      { name: '이찬호', age: 26 },
      { name: '김정혁', age: 26 },
      { name: '이류림', age: 27 },
      { name: '송민영', age: 25 },
      { name: '최인영', age: 24 },
    ]);
    // console.log(insertManyResult);
    if (!insertManyResult.acknowledged) {
      return '여러개 삽입 에러 발생';
    }

    // 3. 하나 삽입하기.
    const insertOneResult = await test.insertOne({
      name: '박성재',
      age: 28,
    });
    // console.log(insertOneResult);
    if (!insertOneResult.acknowledged) {
      return '한개 삽입 에러 발생';
    }

    // // 4.하나 삭제하기.
    const deleteOneResult = await test.deleteOne({
      name: '최인영',
    });
    // console.log(deleteOneResult);
    if (!deleteOneResult.acknowledged) {
      return '하나 삭제 에러 발생';
    }

    // 5. 특정 하나 골라서 업데이트하기.
    const updateOneResult = await test.updateOne(
      { name: '이찬호' },
      { $set: { name: '천재', age: 1000 } },
    );
    // console.log(updateOneResult);
    if (!updateOneResult.acknowledged) {
      return '하나 골라서 업데이트 에러 발생.';
    }

    // 6. 여러개 삭제하기.
    const deleteManyResult2 = await test.deleteMany({ age: { $gte: 28 } });
    // console.log(deleteManyResult2);
    if (!deleteManyResult2.acknowledged) {
      return '여러개 삭제하기 에러 발생';
    }

    // 7. findOne(검색조건을 만족하는 최초의 도큐먼트 한개 찾기.)
    const findOneResult = await test.findOne({
      name: '김정혁',
    });
    console.log(findOneResult);

    // 8 find(조건에 만족하는 도큐먼트를 전부 찾기.)
    const findAllCurSor = test.find({
      age: { $gte: 25 },
    });
    console.log('얐니?');
    console.log(findAllCurSor);
    const findAll = findAllCurSor.toArray();
    console.log(findAll);
  } catch (err) {
    console.err(err);
  }
}
main();
