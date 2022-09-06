import {Response} from 'express';

interface ISuccessResponse {
    res: Response;
    data: any;
    status: string;
    message: string;
    statusCode: number;
}

const successResponse: any = (
    {
        res,
        data,
        status = 'success',
        message = 'Success',
        statusCode = 200,
    }: ISuccessResponse,
) => {
    return res.status(statusCode).json({
        success: true,
        status: status,
        message: message,
        data: data,
    });
};

export default successResponse;
