// import { db } from './database/BaseDatabase'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserDatabase } from './database/UserDatabase'
import { User } from './models/User'
import { UserDB } from './types'
import { usersRouter } from './routers/usersRouter'
import { postsRouter } from './routers/postsRouter'
import { likesDislikesRouter } from './routers/likesDislikesRouter'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

//index
//router
//controller
//business


//post /users (path) esse middleware vai lidar com / users ok chama o roteador usersRouter como entrou 
//em /users ai tirar o users e vai para router

//signup
// login
app.use("/users", usersRouter)


 //get posts
 //create post
 //edit post
 //delete post
 app.use("/posts", postsRouter)


// like / dislike post
app.use("likes_dislikes", likesDislikesRouter)










