import server from './main/server'
import { MongoDBRepository } from './infra/mongodb/repository'

const mongorepository = new MongoDBRepository()

mongorepository.connect().then(async () =>
  server.listen(3000,() => {
    console.log('We are on fire')
  })
).catch(error => {
  console.log('Error')
  console.log(error)
})

// server.listen(3000, () => {
//   console.log('We are on fire')
// })

// mongorepository.connect().then(connection => {
//   console.log('Conectou com: ')
//   //return mongorepository.insertOne().then(console.log)

// }).catch(error => {
//   console.log('Deu erro')
//   console.log(error)
// })
