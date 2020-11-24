const MongoClient = require('mongodb').MongoClient;

// Bad practice: don't keep sensitive data in git
const CONFIG = {
  USER: 'robby',
  PASS: 'ZH94Yfkb',
  URL: 'cluster0.t9smo.mongodb.net',
  DB: 'app',
};

const uri = `mongodb+srv://${encodeURIComponent(CONFIG.USER)}:${encodeURIComponent(CONFIG.PASS)}@${
  CONFIG.URL
}/`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
module.exports = { client };

client
  .connect()
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.error('Error on connecting to MongoDB server', error))
  .then(() => {
    const movies = client.db(CONFIG.DB).collection('movies');
    module.exports.movies = movies;
  });
