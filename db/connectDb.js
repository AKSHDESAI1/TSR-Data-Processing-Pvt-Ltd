const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const mongoUri = "mongodb+srv://rohanguptabc80:rohan0000@cluster0.kpjqdwd.mongodb.net/test";
        const dbOptions = {
            dbName: "TSR_Data_Processing"
        };
        const connect = await mongoose.connect(mongoUri, dbOptions);
        console.log("Database Connection Successfully");
    } catch (error) {
        console.log("error", error)
    }

}


module.exports = connectDb;