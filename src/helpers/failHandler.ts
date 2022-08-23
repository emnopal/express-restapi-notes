interface IFailResponse {
    response: any;
    data?: any;
    status: string;
    message: string;
    statusCode: number;
}

const failResponse: any = (
    {
        response,
        data = null,
        status = 'fail',
        message = 'Fail',
        statusCode = 500,
    }: IFailResponse,
) => {
    return response.status(statusCode).json({
        success: false,
        status: status,
        message: message,
        data: data,
    });
};

export default failResponse;
