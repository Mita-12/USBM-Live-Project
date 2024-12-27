const mongoose = require("mongoose");
require("dotenv").config();
const NewandannuSchema = mongoose.Schema({
    heading:String,
    descreption:String,
    time:String,
    image:String
});
module.exports = mongoose.model("Newsandannu",NewandannuSchema);