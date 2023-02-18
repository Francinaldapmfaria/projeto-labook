import { UserDatabase } from "../database/UserDatabase"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO"
import { BadRequestError } from "../error/BadRequestError"
import { User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload, UserDB, USER_ROLES } from "../types"


export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public userSignup = async(input:SignupInputDTO): Promise<SignupOutputDTO> => {

       // desetrutura o que precisa do input

       const { name, email, password} = input

        // if (typeof id !== "string") {
          
        //     throw new Error("'id' deve ser string")
        // }

        if (typeof name !== "string") {
          
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
          
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
          
            throw new BadRequestError("'password' deve ser string")
        }
        // if (typeof role !== "string") {
          
        //     throw new Error("'role' deve ser string")
        // }

        // const userDatabase = new UserDatabase()

        const userDBExists = await this.userDatabase.findUserEmail(email)
        if (userDBExists) {
            
            throw new Error("'email' ja existe");
        }

        
        const id = this.idGenerator.generate()
        const hashePassword = await this.hashManager.hash(password)
        const role = USER_ROLES.USUARIO
        const createdAt = new Date().toISOString()
        
        //não precisa mais desta verificação, esta criaçã de id é segura
        // const userDBExists = await this.userDatabase.findUserById(id)
        // if (userDBExists) {
            
        //     throw new Error("'id' ja existe");
        // }

        //newuser instanciado para que seja possivel coloca-lo no banco de dados
        const newUser = new User(
            id,
            name,
            email,
            hashePassword,
            role,
            createdAt
        )

        const newUserDB= newUser.toDBModel()

        await this.userDatabase.insertUser(newUserDB)


        //gerando um token
        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        
        const output: SignupOutputDTO = {
            token
        }

        return output


    }

    public userLogin = async (input:any) =>{
        const {email, password} = input

        if (typeof email !== "string"){
            throw new Error("'email'deve ser uma string")
        }

        if(typeof password !== "string"){
            throw new Error("'password' deve ser string")
        }

        const searchUserDB = await this.userDatabase.findUserEmail(email)

        if(!searchUserDB) {
            throw new Error("'email' não encontrado")
        }
        if(password !== searchUserDB.password){
            throw new Error("'email' ou 'password' incorretos")
        }

        const output = {
            message: "Login realizado com sucesso"
        }

        return output
    }
}