import NotesModel from '../models/notesModel.js';
import failHandler from '../helpers/failHandler.js';
import successHandler from '../helpers/successHandler.js';

export const addNoteHandler = async (request, response) => {
    const {body} = request;

    try {
        const notes = new NotesModel(body);
        const result = await notes.save();

        return successHandler({
            response: response,
            data: {
                success: result,
            },
            message: 'Success added notes',
        });
    } catch (error) {
        console.log(error);
        return failHandler({
            response: response,
            data: {
                error: error,
            },
            message: 'Fail added notes',
        });
    }
};

export const getNotesHandler = async (request, response) => {
    const {id} = request.params;

    try {
        let notes;

        if (id) {
            notes = await NotesModel.findById(id).exec();
        } else {
            notes = await NotesModel.find().exec();
        }

        const parseMsgSuccess =
            id ? `Success getting note ${id}` : 'Success get all notes';

        return successHandler({
            response: response,
            data: {
                notes: notes,
            },
            message: parseMsgSuccess,
        });
    } catch (error) {
        const parseMsgFail =
            id ? `Fail getting note ${id}` : 'Fail get all notes';

        return failHandler({
            response: response,
            data: {
                error: error,
            },
            message: parseMsgFail,
        });
    }
};

export const editNoteHandler = async (request, response) => {
    const {id} = request.params;
    const {body} = request;
    const updatedAt = new Date().toISOString();

    const updatedData = {
        title: body.title,
        tags: body.tags,
        body: body.body,
        updatedAt: updatedAt,
    };

    const isNew = {
        new: true,
    };

    try {
        const result = await NotesModel.findByIdAndUpdate(
            id, updatedData, isNew).exec();

        return successHandler({
            response: response,
            data: {
                result: result,
            },
            message: `Success change note ${id}`,
        });
    } catch (error) {
        return failHandler({
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
    const {id} = request.params;

    try {
        const result = await NotesModel.findByIdAndDelete(id).exec();
        return successHandler({
            response: response,
            data: {
                result: result,
            },
            message: `Success deleting note ${id}`,
        });
    } catch (error) {
        return failHandler({
            response: response,
            data: {
                error: error,
            },
            statusCode: 404,
            message: `Failed to deleting note ${id}, note ${id} not found`,
        });
    }
};
