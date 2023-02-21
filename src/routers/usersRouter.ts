import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/userController"
import { UserDatabase } from "../database/UserDatabase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export const usersRouter = express.Router()


//existe um post? sim, tem /? sim então executa o callback
////create post

//tirei o callback e joguei na controller e agora tenho que instanciar para poder usar a classe da controller

//instanciei a controller, a controller tem como injeção de dependência a instancia new userBiness, 
//e userBisness
const userController =  new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
) //instanciado eu chamo em baixo a variavel que guarda a class, mas não funciona sozinha 
//tem que chamar o método createUsers
usersRouter.post("/signup", userController.userSignup )
usersRouter.post("/login", userController.userLogin )

