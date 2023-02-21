import { PostDatabase } from "../database/PostDatabase";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../error/BadRequestError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostsAndItCreatorDB } from "../types";

export class postBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
       
    ) {}

    public PostsGet = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        const {token} = input

        if(token === undefined) {
            throw new BadRequestError("token não existe")
        }

            //pegar o payload do token é valida-lo
        const payload = this.tokenManager.getPayload(token)

            
        if(payload === null) {
            throw new BadRequestError("token inválido")

        }

        const postsAndItsCreatorsDB: PostsAndItCreatorDB []= 
        await this.postDatabase.getPostIfCreator()

        const posts= postsAndItsCreatorsDB.map((postAndCreatorDB) =>{
            const post = new Post(
                postAndCreatorDB.id,
                postAndCreatorDB.content,
                postAndCreatorDB.likes,
                postAndCreatorDB.dislikes,
                postAndCreatorDB.created_at,
                postAndCreatorDB.updated_at,
                postAndCreatorDB.creator_id,
                postAndCreatorDB.creator_name,

            )
                return post.toBusinessModel()

        })

        const output: GetPostOutputDTO = posts

        return output
    }
}