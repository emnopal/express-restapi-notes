import express from "express";

import {
    addNoteHandler,
    getAllNotesHandler,
    getNoteHandler,
    editNoteHandler,
    deleteNoteHandler,
} from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', getAllNotesHandler);
router.get('/notes/:id', getNoteHandler);
router.post('/notes', addNoteHandler);
router.put('/notes/:id', editNoteHandler);
router.delete('/notes/:id', deleteNoteHandler);

export default router;
