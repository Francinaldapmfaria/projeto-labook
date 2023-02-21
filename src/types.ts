export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface PostsDB {
    id: string,
    creator_id: string,
    content :string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string
}

export interface PostsAndItCreatorDB extends PostsDB {
   
    creator_name: string
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