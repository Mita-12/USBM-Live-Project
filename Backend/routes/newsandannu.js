const express = require("express");
const router = express.Router();
const Newsandannu = require("../models/Newsandannu");


//All student
router.get("/", async (req, res) => {
    try {
        const Newandannu = await Newandannu.find();
        res.status(200).json({ data: Newandannu });
    }
    catch (error) {
        res.status(500).json({ msg: " Error fetching data", error });
    }
});
//create by id
router.get("/:id", async (req, res) => {
    try {
        const newsandannu = await Newsandannu.findById(req.params.id);
        res.status(200).json({ data: Newsandannu });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});

router.post("/", async (req, res) => {
    try {
        const newsandannu = new Newsandannu(req.body);
        const newnewsandannu = await newsandannu.save();
        res.status(200).json({ data: "Newsandannu" });
    }
    catch (erro) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.post("/login", async (req, res) => {
    try {
        const newUser = await Newsandannu.findOne({ email: req.body.email });
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
        const newsandannu = await Newsandannu.findById(req.params.id);
        if (!newsandannu) {
            return res.status(404).json({ msg: "student not found" })
        }
        newsandannu.heading = req.body.heading || newsandannu.heading;
        newsandannu. descreption = req.body. descreption || newsandannu. descreption;
        newsandannu.time = req.body.time || newsandannu.time;
        newsandannu.image = req.body.image || newsandannu.image;


        const updatenewsandannu = await newsandannu.save();

        res.status(200).json({ data: updatenewsandannu });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Newsandannu.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "Newsandannu delete", error });
    }
    catch (error) {
        res.status(500).json({ msg: "Deleting error", error });
    }
});

module.exports = router;