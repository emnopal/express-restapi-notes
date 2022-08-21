import express from "express";

import {
    addNoteHandler,
    getNotesHandler,
    editNoteHandler,
    deleteNoteHandler,
} from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes/:id?', getNotesHandler);
router.post('/notes', addNoteHandler);
router.put('/notes/:id', editNoteHandler);
router.delete('/notes/:id', deleteNoteHandler);

export default router;
