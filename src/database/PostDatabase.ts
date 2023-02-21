import { PostsAndItCreatorDB } from "../types"
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

}



