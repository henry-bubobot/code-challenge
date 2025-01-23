import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: { title: 'Resource API', version: '1.0.0', description: 'CRUD API with resource model' },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            schemas: {
                Resource: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Web Server' },
                        description: { type: 'string', example: 'A production web server' },
                        status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'], example: 'ACTIVE' },
                        priority: { type: 'integer', minimum: 1, maximum: 5, example: 3 },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-01-22T14:48:00.000Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-01-22T14:48:00.000Z' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
};

export default swaggerUi.setup(swaggerJsDoc(swaggerOptions));