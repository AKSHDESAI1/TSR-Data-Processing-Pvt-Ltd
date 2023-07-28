const express = require("express");
const path = require("path");
const router = require("./routes/web.js");
const connectDb = require("./db/connectDb");
const MongoStore = require("connect-mongo");
const session = require("express-session");


const app = express()

const PORT = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

//Define Static Css and Js directory.
app.use(express.static("./public"));
app.use('/document', express.static(path.join(process.cwd(), "images")))

app.use(express.urlencoded({ extended: false }));

// MongoDB Session
const sessionStorage = MongoStore.create({
    mongoUrl: "mongodb+srv://rohanguptabc80:rohan0000@cluster0.kpjqdwd.mongodb.net/test",
    dbName: "TSR_Data_Processing",
    collectionName: "session",
    ttl: 604800000,
    autoRemove: "native",
});

//session
app.use(
    session({
        name: "sessionkey",
        secret: "iamkey",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 604800000 },
        store: sessionStorage,
    })
);

connectDb();

// Load Routes
app.use(router);


app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT} Port.`);
})