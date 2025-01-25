const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ratriisagoodgirl';
router.get("/", (req, res) => {
    const obj = {
        a: 1,
        b: 2
    };
    res.json(obj);
});

// Create a user using: POST "/api/auth/createUser". No login required
router.post("/createUser", [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async(req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // We will handle the database part here
    try{
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        res.json({authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


// Authenticate a user using: POST "/api/auth/login". Login Required
router.post("/login", [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists()
], async(req, res)=> {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()});
    }
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        res.json({authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;