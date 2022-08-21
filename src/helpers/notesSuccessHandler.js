const successResponse = (
    {
        response,
        data,
        status = 'success',
        message = 'Success',
        statusCode = 200,
    },
) => {
    return response.status(statusCode).json({
        success: true,
        status: status,
        message: message,
        data: data
    });
};

export default successResponse;
