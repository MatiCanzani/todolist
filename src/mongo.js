const mongoose = require('mongoose');
const dbConnection = mongoose.connect = ('mongodb://localhost:27017/todolist')
    .then(db => console.log('Db Conectada'))
    .catch(err => console.log(err));
    
// db.createUser({ user: 'admin', pwd: 'admin', roles: ['readWrite', 'dbAdmin']});

//  const MongoClient = require('mongodb').MongoClient;
//  const ObjectID = require('mongodb').ObjectID;
//  const dbname = 'todolist';
//  const url = 'mongodb://localhost:27017/todolist';


module.exports = dbConnection;

