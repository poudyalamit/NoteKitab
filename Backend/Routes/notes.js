const { json } = require('express')
const Note = require('../Models/Notes');
const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1:Get All Notes using: Get "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {      //catching the errors occured
        console.error(error.message);
        res.status(500).send("some error occured"); //to get the bad request of error
    }
})

//Route 2:Add a new Note using: POST "/api/auth/fetchallnotes". Login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid name").isLength({ min: 3 }),
    body('description', "Description must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //if there are errors return bad request and errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {

    }
})


module.exports = router;