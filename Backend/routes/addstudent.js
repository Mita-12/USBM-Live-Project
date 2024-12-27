const express = require("express");
const router = express.Router();
const Addstudent = require("../models/Addstudents");


//All student
router.get("/", async (req, res) => {
    try {
        const addstudent = await Addstudent.find();
        res.status(200).json({ data: addstudent });
    }
    catch (error) {
        res.status(500).json({ msg: " Error fetching data", error });
    }
});
//
router.get("/:id", async (req, res) => {
    try {
        const addstudent = await Addstudent.findById(req.params.id);
        res.status(200).json({ data: addstudent });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});
//register
router.post("/", async (req, res) => {
    try {
        const addstudent = new Addstudent(req.body);
        const newaddstudent = await addstudent.save();
        res.status(200).json({ data: "newaddstudent" });
    }
    catch (erro) {
        res.status(500).json({ msg: "server error", error });
    }
});
//login
router.post("/login", async (req, res) => {
    try {
        const newUser = await Addstudent.findOne({ email: req.body.email });
        if (newUser) {
            if (newUser.password === req.body.password) {
                res.status(200).json({ data: "ok", data: number });
            }
            else {
                res.status(200).json({ msg: "incorrect password" })
            }
        } else {
            res.status(404).json({ msg: "invalid user" })
        }
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const addstudent = await Addstudent.findById(req.params.id);
        if (!addstudent) {
            return res.status(404).json({ msg: "student not found" })
        }
        addstudent.name = req.body.name || addstudent.name;
        addstudent.email = req.body.email || addstudent.email;
        addstudent.password = req.body.password || addstudent.password;
        addstudent.grade = req.body.grade || addstudent.grade;
        addstudent.areaOfStudy = req.body.areaOfStudy || addstudent.areaOfStudy;
        addstudent.skills = req.body.skills || addstudent.skills;
        addstudent.language = req.body.language || addstudent.language;
        addstudent.qulification = req.body.qulification || addstudent.qulification;
        addstudent.spcialization = req.body.spcialization || addstudent.spcialization;
        addstudent.teachingExp = req.body.teachingExp || addstudent.teachingExp;
        addstudent.type = req.body.type || addstudent.type;
        addstudent.addDate = req.body.addDate || addstudent.addDate;
        addstudent.timing = req.body.timing || addstudent.timing;
        addstudent.videoLink = req.body.videoLink || addstudent.videoLink;
        addstudent.profilePhoto = req.body.profilePhoto || addstudent.profilePhoto;

        const updateAddstudent = await addstudent.save();

        res.status(200).json({ data: updateAddstudent });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Addstudent.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "student delete", error });
    }
    catch (error) {
        res.status(500).json({ msg: "Deleting error", error });
    }
})

module.exports = router;
