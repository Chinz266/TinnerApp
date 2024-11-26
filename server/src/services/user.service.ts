import mongoose, { RootFilterQuery } from "mongoose";
import { updateProfile, user, userPagination, userPaginator } from "../types/user.type";
import { IUserDocumet } from "../interfaces/user.interface";
import { QueryHelper } from "../helper/query.helper";


export const UserService = {
    get: function (pagination: userPagination, user_id: string):Promise<userPaginator> {
        let filter: RootFilterQuery<IUserDocumet> = {
            id:{$nin: new mongoose.Types.ObjectId(user_id)},
            $adn: QueryHelper.parseUserQuery(pagination)
        }
        throw new Error('not implemen');
    },
    getByUserName: function(username: string):Promise<user> {
        throw new Error('not implemen');
    },
    updateProfile: function(newProfile: updateProfile, user_id:string):Promise<user> {
        throw new Error('not implemen');
    }
}