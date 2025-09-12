import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import config from './config/config.js';
import { connectMongo } from './db/mongo.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockRouter from './routes/mock.router.js';

const app = express();
const PORT = config.PORT;

// Conexión a MongoDB
connectMongo();

// Swagger config embebida
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'Documentación del proyecto AdoptMe'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' }
          }
        },
        Pet: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            specie: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            adopted: { type: 'boolean' },
            owner: { type: 'string', nullable: true }
          }
        },
        Adoption: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            owner: { $ref: '#/components/schemas/User' },
            pet: { $ref: '#/components/schemas/Pet' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Asegurate de tener comentarios JSDoc en tus rutas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mockRouter);

// Documentación Swagger
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});