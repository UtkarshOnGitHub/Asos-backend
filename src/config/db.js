const mongoose = require('mongoose');

const dbConnect = ()=>{
    mongoose.set('strictQuery', true);
    return mongoose.connect('mongodb+srv://kira:kira@cluster0.6b3imib.mongodb.net/asosdatabase');
}
module.exports = dbConnect;