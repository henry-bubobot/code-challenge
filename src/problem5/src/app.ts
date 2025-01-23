import express from 'express';
import env from './config'; // Import validated env variables
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';


const app = express();
const PORT = env.PORT;

app.use(bodyParser.json());
app.use('/resources', resourceRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerDocs);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

export default app;