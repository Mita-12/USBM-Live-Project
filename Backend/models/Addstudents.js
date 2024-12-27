const mongoose =require("mongoose");//CJS METHOD

const AddstudentsSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    grade:String,
    areaOfStudy:String,
    skills:Array,
    language:String,
    qulification:String,
    spcialization:String,
    teachingExp:String,
    type:String,
    addDate:String,
    timing:Array,
    videoLink:String,
    profilePhoto:String

});
    module.exports = mongoose.model("AddStudents",AddstudentsSchema)