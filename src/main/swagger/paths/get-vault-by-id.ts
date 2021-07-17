export const getVaultByIdPath = {
  get: {
    tags: ['Query vault by id'],
    summary: 'Route to query a vault by id',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id to find vault',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/vault'
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string'
                }
              },
              required: ['error']
            }
          }
        }
      },
      500: {
        description: 'Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string'
                }
              },
              required: ['error']
            }
          }
        }
      }
    }
  }
}
