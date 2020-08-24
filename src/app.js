const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')({origin : true});
const indexRoutes = require('../src/routes/index');
const connection = require('./database');

//settings
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use('/',indexRoutes);

// //server
const PORT = process.env.PORT || 4000;

connection();
app.listen(PORT,() => {
    console.log('Server Conected to ' + PORT)
});

