import { Request, Response } from "express"
import { AppError } from "../utils/AppError"

class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query

    response.send(`${page} ${limit}`)
  }

  create(request: Request, response: Response) {
    const { name, price } = request.body

    if(!name) {
      throw new AppError("Nome do produto é obrigatório!")
    }

    if(name.trim().length < 6) {
      throw new AppError("Nome do produto precisa conter ao menos 6 caracteres!")
    }

    if(!price) {
      throw new AppError("Preço do produto é obrigatório!")
    }

    if(price < 0) {
      throw new AppError("O preço do produto não pode ser negativo!")
    }

    response.status(201).json({ name, price, user_id: request.user_id })
  }
}

export { ProductsController }