import Notes from '../models/notes';
import failHandler from '../helpers/failHandler';
import successHandler from '../helpers/successHandler';
import {Request, Response} from 'express';

export const addNoteHandler: any = async (
    req: Request, res: Response,
) => {
    const {body} = req;

    try {
        const notes = new Notes(body);
        const result = await notes.save();

        return successHandler({
            res,
            data: {
                notes: result,
            },
            message: 'Success added notes',
        });
    } catch (error) {
        return failHandler({
            res,
            data: error,
            message: 'Fail added notes',
        });
    }
};

export const getNotesHandler: any = async (
    req: Request, res: Response,
) => {
    const {id} = req.params;

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
            res,
            data: {
                notes: notes,
            },
            message: parseMsgSuccess,
        });
    } catch (error) {
        const parseMsgFail: string =
            id ? `Fail getting note ${id}` : 'Fail get all notes';

        return failHandler({
            res,
            data: error,
            message: parseMsgFail,
        });
    }
};

export const editNoteHandler: any = async (
    req: Request, res: Response,
) => {
    const {id} = req.params;
    const {body} = req;
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
            res,
            data: {
                result: result,
            },
            message: `Success change note ${id}`,
        });
    } catch (error) {
        return failHandler({
            res,
            data: error,
            statusCode: 404,
            message: `Failed to changing note ${id}, note ${id} not found`,
        });
    }
};

export const deleteNoteHandler: any = async (
    req: Request, res: Response,
) => {
    const {id} = req.params;

    try {
        const result = await Notes.findByIdAndDelete(id).exec();
        return successHandler({
            res,
            data: {
                result: result,
            },
            message: `Success deleting note ${id}`,
        });
    } catch (error) {
        return failHandler({
            res,
            data: error,
            statusCode: 404,
            message: `Failed to deleting note ${id}, note ${id} not found`,
        });
    }
};
