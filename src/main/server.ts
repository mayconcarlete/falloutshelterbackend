import express, {Request, Response} from 'express'
import { makeCreate } from './create-route'

const app = express()

app.use(express.json())


app.post('/create', async(req: Request, res: Response) => {
    const response = await makeCreate(req)
    res.json(response)
})

export default app