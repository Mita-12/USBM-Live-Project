const express = require("express");//import express
const router = express.Router();

const Addcourse = require("../models/AddCourse");
const redis = require("redis");
const util = require("util");


const redisUrl = "redis://127.0.0.1:6379";//localhost default code no
//localhost set and get method
const client = redis.createClient(redisUrl);

client.set = util.promisify(client.set);//key and value
client.get = util.promisify(client.get);

//const register = async()=>{}


router.get("/", async (req, res) => {
    try {
        const addcourse = await Addcourse.find();
        res.status(200).json({ data: addcourse });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});

router.get("/ id", async (req, res) => {
    //Resdis-caching (show the previous data)disctionry data
    try {
        const courseId = req.params.id;//get the user id
        const cachedCourse = await client.get(`client:${courseId}`);
        if (cachedCourse) {
            const course = JSON.parse(cachedCourse);
            return res.status(200).json({ data: course });
        }
        // Real data use
        const course = await Addcourse.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "course not found" });
        }
        //Resdis-caching (show the previous data)disctionry data
        await client.set(`course-${courseId}`, JSON.stringify(course));
        //over
        res.status(200).json({ data: course });
    }
    catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});

router.post("/ ", async (req, res) => {
    try {
        //const body = 
        const addcourse = new Addcourse(req.body);
        const newaddcourse = await addcourse.save();
        res.status(200).json({ data: newaddcourse });

    }
    catch (error) {
        res.status(500).json({ msg: "server error", error })
    }
});

router.post("/login", async (req, res) => {
    try {
        const newUser = await Addcourse.findOne({ email: req.body.email })
        if (newUser) {
            if (newUser.password === req.body.passwrd) {
                res.status(200).json({ msg: "ok", data: newUser })
            }
            else {
                res.status(200).json({ msg: "incorrect password" })
            }
        }
        else {
            res.status(404).json({ msg: "invalid user" })
        }
    }
    catch (error) {
        res.status(500).json({ msg: "incorrect password" })
    }
});

router.put("/ id", async (req, res) => {
    try {
        const addcourse = await Addcourse.findById(req.params.id)
        if (!addcourse) {
          return  res.status(404).json({ msg: "Course not found" })
        }
        addcourse.email = req.body.email || addcourse.email;
        addcourse.password = req.body.password || addcourse.password;

        const updateAddcourse = await addCourse.save();
        res.status(200).json({ data: updateAddcourse });
    }
    catch (error) {
        res.status(500).json({ msg: "incorrect password" })
    }
});
router.delete("/ id", async (req, res) => {
    try {
        await Addcourse.findByRemove(req.params.id);
        res.status(200).json({ msg: "Addcourse delete" });
    }
    catch (error) {
        res.status(500).json({ msg: "incorrect password" })

    }
});
module.exports = router;