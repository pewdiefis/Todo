const  express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const DB_URI = "mongodb://localhost:27017/todoapp"


app.set('view', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


MongoClient.connect(DB_URI,(err,db) => {
    if (err) {
        console.log("Error" + err);
    }
    todos = db.collection('todos');
    console.log("Login Succsesful " + DB_URI);
})

console.log('Hello world');