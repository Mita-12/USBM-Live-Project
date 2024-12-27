const mongoose =require("mongoose");//CJS METHOD

//add schema
const AddcourseSchema = mongoose.Schema({
    courseName : String,  
}

)
//modle
//const Addcourse
    module.exports = mongoose.model("Addcourse",AddcourseSchema)