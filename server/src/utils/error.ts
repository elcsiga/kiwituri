export class ServerError extends Error {
    constructor( public status: number, message: string) {
        super(message);
    }
}

export function sendError(res, status: number, message: string, error?: any) {
    console.error('ERROR', message, status);
    res.status(status);
    res.json({
        status: status,
        message: message,
        error: error
    });
}


export const errorHandler = (err, req, res, next) => {
    if (err instanceof ServerError) {
        const error = err as ServerError;
        sendError(res, error.status, error.message, error);
    } else {
        sendError(res, 500, 'Runtime error', err);
    }
};
