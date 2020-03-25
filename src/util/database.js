const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb+srv://prakash:prakash@cluster0-tkc4p.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(client =>{
        _db = client.db('NodeCourse'); // Mongodb will create NodeCourse database if it does not exist
        console.log('connected to database');
        callback(client);
    }).catch(err =>{
        console.log('error' + err);
        throw err;
    });
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No connection to database'
}

module.exports = {
    mongoDBConnect : mongoConnect,
    getDb : getDb
};
 // if we don't use getdb function and just use following code 
// module.exports = mongoConnect
// then if we need database in any file and if we import it there then it will create one more connecton
// it will create new connecton for every file in that case
// so write new function getDb and return just connected database
