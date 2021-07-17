import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { noCacheSwagger } from '../middlewares/no-cache-swagger'
import swaggerConfig from '../swagger/'

export const swaggerSetup = (app: Express) => {
  app.use('/api-docs', noCacheSwagger, serve, setup(swaggerConfig))
}
