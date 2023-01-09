const mongoose = require('mongoose');

//const URI = "mongodb://localhost:27017/doppelganger";
const URI = "mongodb://admin:Cx123456@10.32.6.153:27017/qa-integration?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log('Database (QAPT) Connected');
}

module.exports = connectDB;