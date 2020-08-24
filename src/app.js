const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const indexRoutes = require('../src/routes/index');
const connection = require('./database');

//settings
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// mongoose.set('useFindAndModify', false);
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

// app.use(bodyParser.urlencoded({ extended:true }));
app.use('/',indexRoutes);

// //server
const PORT = process.env.PORT || 4000;

connection();
app.listen(PORT,() => {
    console.log('Server Conected to ' + PORT)
});

