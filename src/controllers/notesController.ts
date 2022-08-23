import Notes from '../models/notes';
import failHandler from '../helpers/failHandler';
import successHandler from '../helpers/successHandler';
import {Request, Response} from 'express';

export const addNoteHandler: any = async (
    request: Request, response: Response,
) => {
    const {body} = request;

    try {
        const notes = new Notes(body);
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

export const getNotesHandler: any = async (
    request: Request, response: Response,
) => {
    const {id} = request.params;

    try {
        let notes: any;

        if (id) {
            notes = await Notes.findById(id).exec();
        } else {
            notes = await Notes.find().exec();
        }

        const parseMsgSuccess: string =
            id ? `Success getting note ${id}` : 'Success get all notes';

        return successHandler({
            response: response,
            data: {
                notes: notes,
            },
            message: parseMsgSuccess,
        });
    } catch (error) {
        const parseMsgFail: string =
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

export const editNoteHandler: any = async (
    request: Request, response: Response,
) => {
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
        const result = await Notes.findByIdAndUpdate(
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

export const deleteNoteHandler: any = async (
    request: Request, response: Response,
) => {
    const {id} = request.params;

    try {
        const result = await Notes.findByIdAndDelete(id).exec();
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
