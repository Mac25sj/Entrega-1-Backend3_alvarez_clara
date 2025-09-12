const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'API para gestión de usuarios, mascotas y adopciones'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local en entrono de desarrollo'
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
    },
    paths: {
      '/api/users': {
        get: {
          summary: 'Obtener todos los usuarios',
          tags: ['Users'],
          responses: {
            '200': {
              description: 'Lista de usuarios',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      payload: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/User' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/users/{uid}': {
        get: {
          summary: 'Obtener un usuario por ID',
          tags: ['Users'],
          parameters: [
            {
              name: 'uid',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Usuario encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            '404': { description: 'Usuario no encontrado' }
          }
        }
      },
      '/api/adoptions': {
        get: {
          summary: 'Obtener todas las adopciones',
          tags: ['Adoptions'],
          responses: {
            '200': {
              description: 'Lista de adopciones',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      payload: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Adoption' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/adoptions/{aid}': {
        get: {
          summary: 'Obtener una adopción por ID',
          tags: ['Adoptions'],
          parameters: [
            {
              name: 'aid',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Adopción encontrada',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Adoption' }
                }
              }
            },
            '404': { description: 'Adopción no encontrada' }
          }
        }
      },
      '/api/adoptions/{uid}/{pid}': {
        post: {
          summary: 'Crear una adopción',
          tags: ['Adoptions'],
          parameters: [
            {
              name: 'uid',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            },
            {
              name: 'pid',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '201': { description: 'Adopción creada' },
            '400': { description: 'Error en la adopción' },
            '404': { description: 'Usuario o mascota no encontrados' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Ajustá según tu estructura
};