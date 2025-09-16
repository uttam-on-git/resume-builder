import dotenv from "dotenv"
import cors from 'cors';
import express, { Application, Request, Response } from "express"
import userRoutes from './api/user/user.route'
import resumeRoutes from './api/resume/resume.route'
import cookieParser from "cookie-parser";
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

//middleware
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from resume builder server')
})

//routes
app.use('/api/users', userRoutes)
app.use('/api/resumes', resumeRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})