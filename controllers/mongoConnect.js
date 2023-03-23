const { MongoClient, ServerApiVersion } = require('mongodb');

const { MONGO_DB_URI } = process.env;
console.log(MONGO_DB_URI);
const uri = MONGO_DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
