import express from 'express';
import { validateResource, validateId } from '../middleware/validateResource';
import {
    createResource,
    listResources,
    getResource,
    updateResource,
    deleteResource,
} from '../controllers/resourceController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management API
 */

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Database Server"
 *               description:
 *                 type: string
 *                 example: "Manages database transactions"
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: "ACTIVE"
 *               priority:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.post('/', validateResource, createResource);

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources (supports pagination & filters)
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *     responses:
 *       200:
 *         description: List of resources
 */
router.get('/', listResources);

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: Resource details
 *       404:
 *         description: Resource not found
 */
router.get('/:id', validateId, getResource);

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *               priority:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Updated resource
 *       404:
 *         description: Resource not found
 */
router.put('/:id', [...validateId, ...validateResource], updateResource);

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *     responses:
 *       204:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 */
router.delete('/:id', validateId, deleteResource);

export default router;