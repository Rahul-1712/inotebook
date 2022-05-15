const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route 1: Fecth all notes from database the User using : GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal server error" });
  }
});

// Route 2: Add notes to databaseusing : POST "/api/notes/addnote". Login required.
router.post(
  "/addnotes",
  fetchuser,
  [
    // title must be at least 5 characters
    body("title", "Enter a Valid name").isLength({ min: 5 }),
    // description must be at least 8 chars long
    body("description", "Password must be 8 chars long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // if there are errors in input respond with bad request and show error.

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({ title, description, tag, user: req.user.id });

      const savedNote = await note.save();

      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.json({ error: "Internal server error" });
    }
  }
);

// Route 3: update existing notes in database using : PUT "/api/notes/updatenote/:id". Login required.
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    // title must be at least 5 characters
    body("title", "Enter a Valid name").isLength({ min: 5 }),
    // description must be at least 8 chars long
    body("description", "Password must be 8 chars long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // if there are errors in input respond with bad request and show error.

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const newNote = {};

      // check which fields have been requested to be updated
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // Find the note to be updaed and update it

      let note = await Notes.findById(req.params.id);

      // check if the note to be updated exists or not
      if (!note) {
        return res.status(404).send("Not found");
      }

      // checking if user trying to update the note is the same user who added the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.send(note);
    } catch (error) {
      console.error(error.message);
      res.json({ error: "Internal server error" });
    }
  }
);

// Route 4: update existing notes in database using : PUT "/api/notes/deletenote/:id". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it

    let note = await Notes.findById(req.params.id);

    // check if the note to be deleted exists or not
    if (!note) {
      return res.status(404).send("Not found");
    }

    // checking if user trying to delete the note is the same user who added the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.send({ Success: "deleted the note", note });
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal server error" });
  }
});

module.exports = router;
