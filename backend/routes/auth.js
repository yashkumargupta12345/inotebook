const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
    const obj = {
        a: 1,
        b: 2
    };
    res.json(obj);
});

router.post("/", (req, res) => {
        const user = new User(req.body);
        user.save();
        res.send("User created");
});


module.exports = router;