const failResponse = (
    {
        response,
        data = null,
        status = 'fail',
        message = 'Fail',
        statusCode = 500,
    },
) => {
    return response.status(statusCode).json({
        success: false,
        status: status,
        message: message,
        data: data
    });
};

export default failResponse;
