const express = require("express");
const router = express.Router();
const Request = require("../models/Request");


//All student
router.get("/", async (req, res) => {
    try {
        const request = await Request.find();
        res.status(200).json({ data: Request });
    }
    catch (error) {
        res.status(500).json({ msg: " Error fetching data", error });
    }
});
router.post("/", async (req, res) => {
    try {
        const request = new Request(req.body);
        const newrequest = await request.save();
        res.status(200).json({ data: "Request" });
    }
    catch (erro) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.post("/login", async (req, res) => {
    try {
        const newrequest = await Request.findOne({ email: req.body.email });
        if (newrequest) {
            if (newrequest.password === req.body.password) {
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
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ msg: "student not found" })
        }
        request.to = req.body.to || request.to;
        request.status = req.body.status || request.status;
        request.from = req.body.from || request.from;
        request.mode = req.body.mode || request.mode;
        request.ambience = req.body.ambience || request.ambience;
        request.course = req.body.course || request.course;


        const updaterequest = await request.save();

        res.status(200).json({ data: updaterequest });
    }
    catch (error) {
        res.status(500).json({ msg: "server error", error });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Request.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "REQUEST delete", error });
    }
    catch (error) {
        res.status(500).json({ msg: "Deleting error", error });
    }
});
module.exports = router;
