import mongoose from "mongoose";
import { register, user } from "../types/account.type";

type userWithOutID = Omit<user, 'id'>

export interface IUserDocumet extends mongoose.Document,userWithOutID {
    password_hash: string

    verifyPassword: (password: string) => Promise<boolean>
    toUser: () => user 
}

export interface IUserModel extends mongoose.Model<IUserDocumet> {
    createUser: (registerData: register) => Promise<IUserDocumet>
}