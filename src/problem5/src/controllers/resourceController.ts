import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prismaClient';
import { ResourceInput, PaginationQuery } from '../types';

// Shared error handler
const handleControllerError = (err: any, next: NextFunction) => {
    console.error('Resource operation failed:', err);
    next(err);
};

/*
    Create a new resource
    @param {Request} req - The request object
    @param {Response} res - The response object
    @param {NextFunction} next - The next function
    @returns {Promise<void>}
*/
export const createResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceData: ResourceInput = req.body;
        const resource = await prisma.resource.create({
            data: {
                ...resourceData,
                priority: resourceData?.priority ?? 3, // Default priority is 3
            },
        });
        res.status(201).json(resource);
    } catch (err) {
        handleControllerError(err, next);
    }
};

// Update existing resource
export const updateResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const resourceData: ResourceInput = req.body;
        
        const resource = await prisma.resource.update({
            where: { id: parseInt(id, 10) },
            data: resourceData,
        });

        res.json(resource);
    } catch (err) {
        handleControllerError(err, next);
    }
};

/*
    List resources with pagination and filtering
    @param {Request} req - The request object
    @param {Response} res - The response object
    @param {NextFunction} next - The next function
    @returns {Promise<void>}
*/
export const listResources = async (req: Request<{}, {}, {}, PaginationQuery>, res: Response, next: NextFunction) => {
    try {
        const { page = '1', limit = '10', name } = req.query;
        const pageNumber = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10))); // Prevent negative values and limit max size

        const whereClause = name ? {
            name: {
                contains: name,
                mode: 'insensitive' as const,
            }
        } : {};

        const [resources, totalRecords] = await Promise.all([
            prisma.resource.findMany({
                where: whereClause,
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
            }),
            prisma.resource.count({ where: whereClause })
        ]);

        res.json({
            data: resources,
            totalRecords,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecords / pageSize),
        });
    } catch (err) {
        handleControllerError(err, next);
    }
};

/*
    Get resource by ID
    @param {Request} req - The request object
    @param {Response} res - The response object
    @param {NextFunction} next - The next function
    @returns {Promise<void>}
*/
export const getResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId = parseInt(req.params.id, 10);
        const resource = await prisma.resource.findUnique({ 
            where: { id: resourceId } 
        });
        
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        
        res.json(resource);
    } catch (err) {
        handleControllerError(err, next);
    }
};

/*
    Delete resource
    @param {Request} req - The request object
    @param {Response} res - The response object
    @param {NextFunction} next - The next function
    @returns {Promise<void>}
*/
export const deleteResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId = parseInt(req.params.id, 10);
        await prisma.resource.delete({ 
            where: { id: resourceId } 
        });
        res.status(204).send();
    } catch (err) {
        handleControllerError(err, next);
    }
};