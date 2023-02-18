import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO"
import { BaseError } from "../error/BaseError"
import { User } from "../models/User"
import { UserDB } from "../types"

//esta poluida

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ){}

    //sempre que for definir métodos na contoller opite por função seta isso na controller na business não tem importancia
    public userSignup = async (req: Request, res: Response) => {
        try {
    
            // const { id, name, email, password, role } = req.body modelou não precisa mais desse


            //modelar
            const input: SignupInputDTO ={
               
                name: req. body.name, 
                email: req.body.email, 
                password: req.body.password, 
               
            }


            //controller recebe a requisição (req)

            //chama a proxima camada, enviando para ela os dados necessários
            const output = await this.userBusiness.userSignup (input)

            //pega a resposta da próxima camada
            //responde a requisição com a resposta (res)

            res.status(201).send(output)
    
          
        } catch (error) {
            
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public userLogin = async (req: Request, res: Response) =>{
        try {

            //modelar entrada
            const input = {
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.userLogin(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200){
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
            
        }
    }
}