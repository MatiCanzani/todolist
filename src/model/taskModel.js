const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema  = new Schema ({
    title : String,
    description: String,
    status: { 
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task',taskSchema) //task es una coleccion