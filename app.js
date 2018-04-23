const  express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const DB_URI = "mongodb://localhost:27017/todoapp"
const bodyParser = require('body-parser');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

app.set('views', path.join(__dirname,'view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

MongoClient.connect(DB_URI,(err,db) => {
    if (err) {
        console.log("Error" + err);
    }
    todos = db.collection('todos');
    console.log("Login Succsesful " + DB_URI);
})
//To put in the database  the values in the  inputs in the index.ejs file
app.post('/todo/add',(req,res,next) =>{
    todos.insert({title: req.body.title, description: req.body.description},(err,document) => {
        if (err) {
            return
        }
        res.redirect('/');
    });
});
//To Display them in  localhost
app.get('/',(req,res) => {
    todos.find({}).toArray((err,docs) => {
        if (err) {
            console.log(err);
        }
        res.render('index', {docs: docs});
    });
});

app.get('/todo/edit/:id',(req,res) => {
    todos.findOne({_id: ObjectId(req.params.id)},(err,doc) => {
            if (err) {
                console.log(err);
            }
            res.render('edit',{doc:doc});
    });
});

app.post('/todo/update/:id',(req,res) => {
    todos.updateOne({_id: ObjectId(req.params.id)},
        {$set: {title: req.body.title, description:req.body.description.trim()}},
        (err,doc) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
    });
});
app.get('/todo/:id',(req,res) => {
    console.log(req.params.id);
    todos.findOne({_id: ObjectId(req.params.id)}, (err,docs) =>{
            if(err){
                console.log(err);
            }
            res.render('show',{docs:docs});
    }) ;
});

app.get('/todo/delete/:id',(req,res) => {
    todos.remove({id: ObjectId(req.params.id)},function(err,docs){
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});


app.listen(3000,"localhost",err => {
    if (err) {
        console.log("Something is wrong!!!");
    }
    else {
        console.log("This server is listening!!");
    }
});


console.log('Hello world');