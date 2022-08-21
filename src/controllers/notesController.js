import notesModel from '../models/notesModel.js';
import notesFailHandler from '../helpers/notesFailHandler.js';
import notesSuccessHandler from '../helpers/notesSuccessHandler.js';

export const addNoteHandler = async (request, response) => {
    const { body } = request;

    try {
        const notes = new notesModel(body);
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

export const getNotesHandler = async (request, response) => {
    const { id } = request.params;

    try {
        const notesWithID = id ? notesModel.findById(id).exec() : notesModel.find().exec();
        const notes = await notesWithID;
        const parseMsgSuccess = id ? `Success getting note ${id}` : 'Success get all notes';
        return notesSuccessHandler({
            response: response,
            data: {
                notes: notes,
            },
            message: parseMsgSuccess,
        });
    } catch (error) {
        const parseMsgFail = id ? `Fail getting note ${id}` : 'Fail get all notes';
        console.log(error);
        return notesFailHandler({
            response: response,
            data: {
                error: error,
            },
            message: parseMsgFail,
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
