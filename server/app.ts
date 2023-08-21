import express, { Express } from 'express'
import cors from 'cors'
import review from './routes/review'
import login from './routes/login'

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/api/review", review)
app.use("/api/login", login)

export default app