const mongoose = require("mongoose");
const MONGO_URI= "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(MONGO_URI).then(
        () => {
            console.log("Connected to mongo successfully")
        }
    ).catch((error) => {
        console.error("Error connecting to mongo", error)
    }
)
}

module.exports = connectToMongo;