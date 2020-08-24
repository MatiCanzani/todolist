const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.hxrrm.mongodb.net/todolist?retryWrites=true&w=majority'
const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useFindAndModify: false
        });
        console.log('Db Connected');
    }
    catch{
        console.log(err)
    }
}
module.exports = connectDb
