import notesSchema from '../schemas/notesSchema';
import mongoose from 'mongoose';
import {schema} from '../configs/environment';

interface notesDocumentInterface extends mongoose.Document {
    title: string;
    tags: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

interface notesModelInterface extends mongoose.Model<notesDocumentInterface> {
    build(attr: notesDocumentInterface): notesDocumentInterface;
}

notesSchema.statics.build = (attr: notesDocumentInterface) => {
    return new Notes(attr);
};

const Notes: mongoose.Model<any> =
    mongoose.model<notesDocumentInterface, notesModelInterface>(
        schema ?? 'notes', notesSchema,
    );

export default Notes;
