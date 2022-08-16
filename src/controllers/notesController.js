import notesModel from '../models/notesModel.js';
import notesFailHandler from '../helpers/notesFailHandler.js';
import notesSuccessHandler from '../helpers/notesSuccessHandler.js';

export const addNoteHandler = async (request, response) => {
    const { title, tags, body } = request.body;

    try {
        const notes = new notesModel({
            title: title,
            tags: tags,
            body: body,
        });
        const result = await notes.save();
        return notesSuccessHandler({
            response: response,
            data: {
                success: result,
            },
            message: 'Success added notes',
        });
    } catch (error) {
        console.log(error);
        return notesFailHandler({
            response: response,
            data: {
                error: error,
            },
            message: 'Fail added notes',
        });
    }
};

export const getAllNotesHandler = async (request, response) => {
    try {
        const notes = await notesModel.find().exec();
        return notesSuccessHandler({
            response: response,
            data: {
                notes: notes,
            },
            message: 'Success get all notes',
        });
    } catch (error) {
        console.log(error);
        return notesFailHandler({
            response: response,
            data: {
                error: error,
            },
            message: 'Fail get all notes',
        });
    }
};

export const getNoteHandler = async (request, response) => {
    const { id } = request.params;

    try {
        const note = await notesModel.findById(id).exec();
        return notesSuccessHandler({
            response: response,
            data: {
                note: note,
            },
            message: `Success getting note ${id}`,
        });
    } catch (error) {
        console.log(error);
        return notesFailHandler({
            h: h,
            data: {
                error: error,
            },
            statusCode: 404,
            message: `Failed to getting note ${id}, note ${id} not found`,
        });
    }
};

export const editNoteHandler = async (request, response) => {
    const { id } = request.params;
    const { title, tags, body } = request.body;
    const updatedAt = new Date().toISOString();

    const updatedData = {
        title: title,
        tags: tags,
        body: body,
        updatedAt: updatedAt,
    };
    const isNew = {
        new: true
    };

    try {
        const result = await notesModel.findByIdAndUpdate(id, updatedData, isNew).exec();
        return notesSuccessHandler({
            response: response,
            data: {
                result: result,
            },
            message: `Success change note ${id}`,
        });
    } catch (error) {
        return notesFailHandler({
            response: response,
            data: {
                error: error,
            },
            statusCode: 404,
            message: `Failed to changing note ${id}, note ${id} not found`,
        });
    }
};

export const deleteNoteHandler = async (request, response) => {
    const { id } = request.params;

    try {
        const result = await notesModel.findByIdAndDelete(id).exec();
        return notesSuccessHandler({
            response: response,
            data: {
                result: result,
            },
            message: `Success deleting note ${id}`,
        });
    } catch (error) {
        return notesFailHandler({
            response: response,
            data: {
                error: error,
            },
            statusCode: 404,
            message: `Failed to deleting note ${id}, note ${id} not found`,
        });
    }
};
