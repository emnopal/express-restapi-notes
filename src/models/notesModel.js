import notesSchema from '../schemas/notesSchema.js';
import mongoose from 'mongoose';
import {schema} from '../configs/environment.js';

const NotesModel = new mongoose.model(schema ?? 'notes', notesSchema);

export default NotesModel;
