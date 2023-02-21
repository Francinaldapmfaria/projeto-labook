import express  from "express"
import { postBusiness } from "../business/postBusiness"
import { PostController } from "../controller/postController"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postsRouter = express.Router()

const postController =  new PostController(
    new postBusiness(
        new PostDatabase,
        new IdGenerator(),
        new TokenManager()
    )
) 

postsRouter.get("/", postController.PostsGet )