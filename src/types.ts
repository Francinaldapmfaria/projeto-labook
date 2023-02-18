export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string
}

export interface PostsDB {
    id: string,
    creator_id: string,
    content :string,
    likes:number,
    dislikes:number,
    createdAt:string,
    updatedAt:string
}

export interface PostsModel{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface LikesDislikesDB {
    user_id: string,
    post_id: string,
    like:number
}

export enum USER_ROLES {
    USUARIO= "Usuário",
    ADMIN = "Admin"
}

export interface TokenPayload {
    id: string,
    name:string,
    role: USER_ROLES
}