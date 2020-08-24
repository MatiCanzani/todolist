const express = require('express');
const server = require('./app') 
const connection = require('./database');
const PORT = process.env.PORT || 4000;
const server = require('./app') 

connection();
server.listen(PORT,() => {
    console.log('Server Conected to ' + PORT)
});
