import { Request, Response } from "express"
import { postBusiness } from "../business/postBusiness"
import { GetPostInputDTO } from "../dtos/userDTO"
import { BaseError } from "../error/BaseError"

export class PostController {
    constructor(
        private postBusiness: postBusiness
    ) {}

    public PostsGet = async (req: Request, res: Response) => {
        try {

           const input: GetPostInputDTO = {
            token: req.headers.authorization
           }

           const output = await this.postBusiness.PostsGet(input)

           res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }
}