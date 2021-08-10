import server from './main/server'
import { MongoDB } from './infra/mongodb/helper'

const mongoRepository = new MongoDB()
const PORT = 3000

mongoRepository.connect().then(async () =>
  server.listen(PORT,() => {
    console.log(`Tudo ok: ${process.env.MONGO_URL}`)
    console.log(`We are online on port: ${PORT}`)
  })
).catch(error => {
  console.log('Error')
  console.log(`Errrouu: ${process.env.MONGO_URL}`)
  console.log(error)
})
