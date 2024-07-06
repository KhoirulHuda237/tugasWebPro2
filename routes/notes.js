// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('index', { notes });
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET form to create a new note
router.get('/new', (req, res) => {
    res.render('new');
});

// POST create a new note
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        body: req.body.body
    });

    try {
        await note.save();
        res.redirect('/notes');
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET form to edit a note
router.get('/:id/edit', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.render('edit', { note });
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST update a note
router.post('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        note.title = req.body.title;
        note.body = req.body.body;
        await note.save();
        res.redirect('/notes');
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
    try {
        await Note.findByIdAndRemove(req.params.id);
        res.redirect('/notes');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
