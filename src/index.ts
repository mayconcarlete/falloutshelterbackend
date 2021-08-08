import server from './main/server'
import { MongoDB } from './infra/mongodb/helper'

const mongoRepository = new MongoDB()
const PORT = 3000

mongoRepository.connect().then(async () =>
  server.listen(PORT,() => {
    console.log(`We are online on port: ${PORT}`)
  })
).catch(error => {
  console.log('Error')
  console.log(error)
})
