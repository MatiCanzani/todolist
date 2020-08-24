const express = require('express');
const server = require('./app') 
const connection = require('./database');
const port = process.env.PORT || 4000;
const server = require('./app') 

connection();
server.listen(port('port') ,() => {
    console.log('Server Conected to ' + port)
});
