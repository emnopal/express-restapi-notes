import express from 'express';

import {
    addNoteHandler,
    getNotesHandler,
    editNoteHandler,
    deleteNoteHandler,
} from '../controllers/notesController';

const router: express.Router = express.Router();

router.get('/notes/:id?', getNotesHandler);
router.post('/notes', addNoteHandler);
router.put('/notes/:id', editNoteHandler);
router.delete('/notes/:id', deleteNoteHandler);

export default router;
