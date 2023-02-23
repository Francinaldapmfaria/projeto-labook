import {PostsModel} from '../types'

// tipagens das entrdas e saidas Inputs e Outputs

// - todo dado vindo do **body** é **unknown**
// - lembrar que o **path params** recebido é sempre **string**
// - o token vem do **req.headers.authorization** e é sempre **string ou undefined**
// - alguns endpoints não requerem saída, somente o **status code**


export interface SignupInputDTO {
    name:unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO{
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDtO {
    token: string
}

export interface GetPostInputDTO {
    token: string | undefined

}

export type GetPostOutputDTO = PostsModel[]

export interface CreatePostsInputDTO {
    token: string |undefined,
    content: unknown
}

export interface EditPostInputDTO {
    idToEdit: string,
    token: string |undefined,
    content: unknown
}

export interface DeletePostInputDTO {
    idToDelete: string,
    token: string |undefined
    
}

export interface LikedislikeInputDTO {
    idLikeDislike: string,
    token: string | undefined,
    like: unknown
}




