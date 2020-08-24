

const mongoose = require('mongoose');
const connectDb = async() => {
    try{
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParse: true
    });
    console.log('Db Connected');
    }
    catch{
        console.log(err)
    }
}
    const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.hxrrm.mongodb.net/todolist?retryWrites=true&w=majority'

module.exports = connectDb
