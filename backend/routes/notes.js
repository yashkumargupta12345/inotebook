const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes"); 
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get all the notes using: GET "/api/notes/fetchAllNotes". Login required
router.get("/fetchallnotes", fetchuser, async(req, res) => {
    try{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : Add a new note using: POST "/api/notes/addNote". Login required
router.post("/addNote", fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5})
], async(req, res) => {
    try{
    const {title, description, tag} = req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const note = new Notes({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
}catch(err){
    console.error(err.message);
    res.status(500).send("Internal Server Error");
}
})


// ROUTE 3 : Update an existing note using: PUT "/api/notes/updateNote". Login required
router.put("/updateNote/:id", fetchuser, async(req, res) => {
    const {title, description, tag} = req.body;
    try{
        // Create a newNote object
        const newNote = {};
        if(title){ newNote.title = title}
        if(description){ newNote.description = description }
        if(tag){ newNote.tag = tag }
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}) 


// ROUTE 3 : Delete an existing note using: Delete "/api/notes/deleteNote". Login required
router.delete("/deleteNote/:id", fetchuser, async(req, res) => {
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}) 




module.exports = router;