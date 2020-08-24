const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const indexRoutes = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost:27017/todolist')
    .then(db => console.log('Db Conectada'))
    .catch(err => console.log(err));

// db.createUser({ user: 'admin', pwd: 'admin', roles: ['readWrite', 'dbAdmin']});
// const dbConnection =  require("./mongo");

//settings
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

//middlelware
app.use('/',indexRoutes);

//server
app.listen(app.get('port') ,() => {
    console.log('server port ', app.get('port'))
});

