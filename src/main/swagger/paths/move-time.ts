export const moveTimePath = {
  post: {
    tags: ['Move Time'],
    summary: 'Route to move time',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/moveTimeParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/time'
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
