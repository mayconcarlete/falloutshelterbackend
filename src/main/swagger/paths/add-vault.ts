export const addVaultPath = {
  post: {
    tags: ['Add Vault'],
    summary: 'Route to insert vault in database',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addVaultParams'
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
