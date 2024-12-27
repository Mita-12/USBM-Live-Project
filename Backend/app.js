const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
//const userlist =require("./routes/userlist");

const app = express();
//connection

//connectDB();
//middleware
app.use(cors());
app.use(express.json());

//checking

app.get("/", (req, res) => {
    //const ID = req.params.ID;
    res.status(200).send({ msg: "is is working" })
});

//router
app.use("/api/userlist", require("./routes/userlist"));
app.use("api/request", require("./routes/request"));
app.use("api/addcourse", require("./routes/addcourse"));
app.use("api/addstudent", require("./routes/addstudent"));
app.use("api/newsandannu", require("./routes/newsandannu"));


//port
const port = process.env.PORT || 5001;

//server run
app.listen(port, () =>
    console.log(`server is running at ${port}`));
