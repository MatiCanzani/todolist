const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const indexRoutes = require('./routes/index');
require('./database')


//settings
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

//middlelware
app.use('/',indexRoutes);
