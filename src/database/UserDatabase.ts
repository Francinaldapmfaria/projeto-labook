import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

    // public async findUserById(id: string) {
    //     const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
    //         .connection(UserDatabase.TABLE_USERS)
    //         .where({ id })

    //     return userDB
    // }

    public async findUserEmail(email: string): Promise<UserDB |undefined> {
        const [userDB] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS).select()
        .where({email})

        return userDB
    }
}
