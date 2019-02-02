
function sendError(res, status: number, message: string, error?: any) {
    console.error('ERROR', message, status);
    res.status(status);
    res.json({
        status: status,
        message: message,
        error: error
    });
}
