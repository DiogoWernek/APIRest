import express, { Request, Response, NextFunction } from "express"
import { AppError } from "./utils/AppError"
import { routes } from "./routes"

const PORT = 3333

const app = express()
app.use(express.json())

app.use(routes)

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  response.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))