import {Response} from 'express';

interface IFailResponse {
    res: Response;
    data?: unknown;
    status: string;
    message: string;
    statusCode: number;
}

const failResponse: any = (
    {
        res,
        data = null,
        status = 'fail',
        message = 'Fail',
        statusCode = 500,
    }: IFailResponse,
) => {
    let dataHandle;

    if (data instanceof Error) {
        dataHandle = data.message;
    } else {
        dataHandle = data;
    }

    return res.status(statusCode).json({
        success: false,
        status: status,
        message: message,
        data: dataHandle,
    });
};

export default failResponse;
