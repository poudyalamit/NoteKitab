const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/NoteKitab?directConnection=true"
const connectmongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo");
    }, 6000)

}

module.exports = connectmongo;
