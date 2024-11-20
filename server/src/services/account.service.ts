import { login } from './../types/account.type';

import { User } from "../models/usre.model";
import { register, user } from "../types/account.type"

export const AccountService = {

    login: async function (LoginData: login): Promise<user> {
        const user = await User.findOne({ username: LoginData.username })
            // TODO: implement photo and like feature
            // .populate('photos')
            // .populate({
            //   path: 'following',
            //   select: '_id'
            // })
            // .populate({
            //   path: 'followers',
            //   select: '_id'
            // })
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
        const newUser = await User.create(registerData);
        return newUser.toUser();
    }
}


