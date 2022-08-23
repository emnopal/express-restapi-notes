import notesSchema from '../schemas/notesSchema';
import mongoose from 'mongoose';
import {schema} from '../configs/environment';

interface INotes {
    title: string;
    tags: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

interface NotesDoc extends mongoose.Document {
    title: string;
    tags: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

interface notesModelInterface extends mongoose.Model<NotesDoc> {
    build(attr: INotes): NotesDoc;
}

notesSchema.statics.build = (attr: INotes) => {
    return new Notes(attr);
};

const Notes: mongoose.Model<any> =
    mongoose.model<NotesDoc, notesModelInterface>(
        schema ?? 'notes', notesSchema,
    );

export default Notes;
