import { register } from './../types/account.type';
import mongoose from "mongoose";
import { IUserDocumet, IUserModel } from "../interfaces/user.interface";
import { user } from './../types/user.type';
import { calculateAge } from "../helper/date.helper";
import { Photo } from './photo.model';

const schema = new mongoose.Schema<IUserDocumet, IUserModel>({
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    display_name: { type: String },
    data_of_birth: { type: Date },
    last_active: { type: Date },
    introduction: { type: String },
    interest: { type: String },
    looking_for: { type: String },
    location: { type: String },
    gender: {type: String},

    //todo: implement photo feature
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
    //todo: implement like feature
    // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
schema.methods.toUser = function (): user {
    let ageString = 'N/A'
    if (this.date_of_birth)
        ageString = `${calculateAge(this.date_of_birth)}`
    
    const userPhotos = Array.isArray(this.photos)
    ? this.photos.map(photo => (new Photo(photo)).toPhoto())
    : undefined
    
    // todo: implement like feature
    // const parseLikeUser = (user: IUserDocument[]) => {
    //     return user.map(u => {
    //         if (u.display_name)
    //             return u.toUser()
    //         return u._id!.toString()
    //     })
    // }
    // const following = Array.isArray(this.following)
    //     ? parseLikeUser(this.following)
    //     : undefined
    // const followers = Array.isArray(this.followers)
    //     ? parseLikeUser(this.followers)
    //     : undefined
    return {
        id: this._id.toString(),
        display_name: this.display_name,
        username: this.username,
        created_at: this.created_at,
        updated_at: this.updated_at,
        // date_of_birth: this.date_of_birth,
        age: ageString,
        last_active: this.last_active,
        introduction: this.introduction,
        interest: this.interest,
        looking_for: this.looking_for,
        location: this.location,
        gender: this.gender,
        // todo: photo feature
        photos: userPhotos,
        // todo: like feature
        // following: following,
        // followers: followers,
    }
}

schema.methods.verifyPassword = async function (password:string): Promise<boolean> {
    return Bun.password.verify(password, this.password_hash)  
}

schema.statics.createUser = async function (registerData:register):  Promise<IUserDocumet> {
    const newUser = await new this({
        display_name: registerData.display_name,
        username: registerData.username,
        password_hash: await Bun.password.hash(registerData.password),
        date_of_birth: registerData.data_of_birth,
        looking_for: registerData.looking_for,
         
    })

    await newUser.save()
    return newUser
}

export const User = mongoose.model<IUserDocumet,IUserModel>("User",schema)


