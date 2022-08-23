interface ISuccessResponse {
    response: any;
    data: any;
    status: string;
    message: string;
    statusCode: number;
}

const successResponse: any = (
    {
        response,
        data,
        status = 'success',
        message = 'Success',
        statusCode = 200,
    }: ISuccessResponse,
) => {
    return response.status(statusCode).json({
        success: true,
        status: status,
        message: message,
        data: data,
    });
};

export default successResponse;
