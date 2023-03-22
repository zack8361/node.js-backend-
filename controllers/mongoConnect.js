const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://1771416:paul2858@cluster0.vbnxpqn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
