import { user } from './../types/user.type';
import { login } from './../types/account.type';
import { User } from "../models/usre.model";
import { register } from "../types/account.type"

export const AccountService = {

    login: async function (LoginData: login): Promise<user> {
        const user = await User.findOne({ username: LoginData.username })
            .populate("photos")
            
            .populate({
                path: "followers",
                select: "_id",
            })
            .populate({
                path: "following",
                select: "_id",
            })

            .exec();

        if (!user) {
            throw new Error("User does not exist");
        }
        const verifyPassword = await user.verifyPassword(LoginData.password);
        if (!verifyPassword) {
            throw new Error("Password is incorrect");
        }

        return user.toUser();
    },
    createNewUser: async function (registerData: register): Promise<user> {
        const user = await User.findOne({ username: registerData.username }).exec()
        if (user)
            throw new Error(`${registerData.username} already exists`);
        const newUser = await User.createUser(registerData);
        return newUser.toUser();
    }
}


