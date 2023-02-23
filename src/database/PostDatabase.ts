import { PostsAndItCreatorDB, PostsDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"


export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

    public getPostIfCreator = async (): Promise<PostsAndItCreatorDB[]> => {
        const result: PostsAndItCreatorDB[]= await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.id" ,
            "posts.creator_id ",
            "posts.content" ,
            "posts.likes",
            "posts.dislikes",
            "posts.created_at",
            "posts.updated_at",
            "users.name As creator_name"
        )
        .join("users","posts.creator_id", "=", "users.id")

        return result
    }

    public insert = async (postDB: PostsDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }

    public findId = async (id: string): Promise<PostsDB |undefined> => {
        const result: PostsDB[]= await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id})

        return result[0]
    }

    public update =  async (idToEdit: string, postDB: PostsDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where({id: idToEdit})
    }

    public delete = async (id:string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .delete().where({id})
    }
}



