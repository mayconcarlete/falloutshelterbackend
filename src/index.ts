import server from './main/server'
import { MongoDB } from './infra/mongodb/helper'
const mongoRepository = new MongoDB()

mongoRepository.connect().then(async () =>
  server.listen(3000,() => {
    console.log('We are on, port: 3000')
  })
).catch(error => {
  console.log('Error')
  console.log(error)
})
