const express = require("express");
const router = express.Router();
const Userlist = require("../models/Userlist");


//All student
router.get("/", async (req, res) => {
    try {
        const userlist = await Userlist.find();
        res.status(200).json({ data: Userlist });
    }
    catch (error) {
        res.status(500).json({ msg: " Error fetching data", error });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const userlist = await Userlist.find();
        res.status(200).json({ data: Userlist });
    }
    catch (error) {
        res.status(500).json({ msg: " Error fetching data", error });
    }
});
//register
router.post("/", async (req, res) => {
    try {
        const userlist = new Userlist(req.body);
        const newuserlist = await userlist.save();
        res.status(200).json({ data: "userlist" });
    }
    catch (erro) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.post("/login", async (req, res) => {
    try {
        const newuserlist = await Userlist.findOne({ email: req.body.email });
        if (newuserlist) {
            if (newuserlist.password === req.body.password) {
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
//update
router.put("/:id", async (req, res) => {
    try {
        const userlist = await Userlist.findById(req.params.id);
        if (!userlist) {
            return res.status(404).json({ msg: "Userlist not found" })
        }
        userlist.firstname = req.body.firstname || userlist.firstname;
        userlist.lastname = req.body.lastname || userlist.lastname;
        userlist.email = req.body.email || userlist.email;
        userlist.password = req.body.password || userlist.password;
        userlist.type = req.body.type || userlist.type;


        const updateuserlist = await userlist.save();

        res.status(200).json({ data: updaterequest });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Userlist.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "Userlist delete", error });
    }
    catch (error) {
        res.status(500).json({ msg: "Deleting  error", error });
    }
});
module.exports = router;
