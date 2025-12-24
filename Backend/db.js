const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myFirstWebApp");

const db = mongoose.connection;

db.on("error" , () => {
    console.log("MongoDB Connection Failed");

});

db.once("open", () => {
    console.log("MongoDB Connect Successfully");

});

module.exports = mongoose;
