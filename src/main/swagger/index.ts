import { getDwellerByIdPath, addDwellerPath, queryDwellerPath, moveTimePath } from './paths'
import { addDwellerParams, moveTimeParams, dweller, time } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Mistplay Vault Challenge',
    description: 'Fallout Shelter Underground Vault',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/'
    }
  ],
  tags: [
    {
      name: 'Add Dweller'
    }
  ],
  paths: {
    '/add-dweller': addDwellerPath,
    '/get-dweller-by-id/{id}': getDwellerByIdPath,
    '/query-dweller': queryDwellerPath,
    '/move-time': moveTimePath
  },
  schemas: {
    addDwellerParams: addDwellerParams,
    dweller: dweller,
    moveTimeParams: moveTimeParams,
    time: time
  }
}
