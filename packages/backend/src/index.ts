import dotenv from "dotenv"
import cors from 'cors';
import express, { Application, Request, Response } from "express"
import userRoutes from './api/user/user.route'
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

//middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from resume builder server')
})

//routes
app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})