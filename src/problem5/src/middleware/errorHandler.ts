import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { validationResult } from 'express-validator';
import { PRISMA_ERROR_CODES, ERROR_MESSAGES } from '../constants';

export const errorHandler = (err: any, req: Request, res: Response) => {
    console.error(err);

    // Handle Validation Errors from Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) 
            return res.status(400).json({ error: ERROR_MESSAGES.DUPLICATE_RECORD });
        if (err.code === PRISMA_ERROR_CODES.FOREIGN_KEY_CONSTRAINT) 
            return res.status(400).json({ error: ERROR_MESSAGES.FOREIGN_KEY_FAILED });
        if (err.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) 
            return res.status(404).json({ error: ERROR_MESSAGES.RECORD_NOT_FOUND });
    }

    res.status(err.status || 500).json({ error: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
};