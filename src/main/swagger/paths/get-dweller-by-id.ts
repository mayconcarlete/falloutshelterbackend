export const getDwellerByIdPath = {
  get: {
    tags: ['Query dweller by id'],
    summary: 'Route to query a dweller by id',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id to find dweller',
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
              $ref: '#/schemas/dweller'
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
