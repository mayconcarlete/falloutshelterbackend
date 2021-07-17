import { getVaultByIdPath, addVaultPath, queryVaultPath, moveTimePath } from './paths'
import { addVaultParams, moveTimeParams, vault, time } from './schemas'

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
      name: 'Add Vault'
    }
  ],
  paths: {
    '/add-vault': addVaultPath,
    '/get-vault-by-id/{id}': getVaultByIdPath,
    '/query-vault': queryVaultPath,
    '/move-time': moveTimePath
  },
  schemas: {
    addVaultParams: addVaultParams,
    vault: vault,
    moveTimeParams: moveTimeParams,
    time: time
  }
}
