import { Request, Response } from "express"
import { z } from "zod"

class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query

    response.send(`${page} ${limit}`)
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required!" })
        .trim()
        .min(3, { message: "Name must be 3 or more characters." }),
      price: z
        .number({ required_error: "Price is required!" })
        .positive({ message: "Price must be positive."}),
    })

    const { name, price } = bodySchema.parse(request.body)

    response.status(201).json({ name, price, user_id: request.user_id })
  }
}

export { ProductsController }