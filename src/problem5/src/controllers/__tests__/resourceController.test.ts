import { Request, Response, NextFunction } from 'express';
import * as resourceController from '../resourceController';
import prisma from '../../models/prismaClient';
import { Status } from '@prisma/client';

// Mock prisma client
jest.mock('../../models/prismaClient', () => ({
  resource: {
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Resource Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createResource', () => {
    it('should create a resource successfully', async () => {
      const mockResourceData = {
        name: 'Test Resource',
        description: 'Test Description',
        status: Status.ACTIVE,
      };
      const mockCreatedResource = { id: 1, ...mockResourceData, priority: 3 };

      mockRequest.body = mockResourceData;
      (prisma.resource.create as jest.Mock).mockResolvedValue(mockCreatedResource);

      await resourceController.createResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(prisma.resource.create).toHaveBeenCalledWith({
        data: { ...mockResourceData, priority: 3 },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedResource);
    });

    it('should handle errors in create', async () => {
      const error = new Error('Creation failed');
      (prisma.resource.create as jest.Mock).mockRejectedValue(error);

      await resourceController.createResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateResource', () => {
    it('should update a resource successfully', async () => {
      const mockResourceData = {
        name: 'Updated Resource',
        description: 'Updated Description',
        status: Status.ACTIVE,
      };
      const mockUpdatedResource = { id: 1, ...mockResourceData };

      mockRequest.params = { id: '1' };
      mockRequest.body = mockResourceData;
      (prisma.resource.update as jest.Mock).mockResolvedValue(mockUpdatedResource);

      await resourceController.updateResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(prisma.resource.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockResourceData,
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedResource);
    });
  });

  describe('listResources', () => {
    it('should list resources with pagination', async () => {
      const mockResources = [{ id: 1, name: 'Resource 1' }];
      const mockQuery = { page: '1', limit: '10' };
      
      mockRequest.query = mockQuery;
      (prisma.resource.findMany as jest.Mock).mockResolvedValue(mockResources);
      (prisma.resource.count as jest.Mock).mockResolvedValue(1);

      await resourceController.listResources(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(prisma.resource.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 10,
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResources,
        totalRecords: 1,
        currentPage: 1,
        totalPages: 1,
      });
    });

    it('should filter resources by name', async () => {
      const mockQuery = { page: '1', limit: '10', name: 'test' };
      mockRequest.query = mockQuery;

      await resourceController.listResources(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(prisma.resource.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'test',
            mode: 'insensitive',
          },
        },
        skip: 0,
        take: 10,
      });
    });
  });

  describe('getResource', () => {
    it('should get a resource by id', async () => {
      const mockResource = { id: 1, name: 'Resource 1' };
      mockRequest.params = { id: '1' };
      (prisma.resource.findUnique as jest.Mock).mockResolvedValue(mockResource);

      await resourceController.getResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(prisma.resource.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockResource);
    });

    it('should return 404 when resource not found', async () => {
      mockRequest.params = { id: '999' };
      (prisma.resource.findUnique as jest.Mock).mockResolvedValue(null);

      await resourceController.getResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resource not found' });
    });
  });

  describe('deleteResource', () => {
    it('should delete a resource successfully', async () => {
      mockRequest.params = { id: '1' };
      (prisma.resource.delete as jest.Mock).mockResolvedValue({});

      await resourceController.deleteResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(prisma.resource.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should handle errors in delete', async () => {
      const error = new Error('Delete failed');
      mockRequest.params = { id: '1' };
      (prisma.resource.delete as jest.Mock).mockRejectedValue(error);

      await resourceController.deleteResource(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
