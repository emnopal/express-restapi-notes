import mongoose from 'mongoose';

const notesSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString(),
    },
    updatedAt: {
        type: Date,
        default: new Date().toISOString(),
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
});

export default notesSchema;
