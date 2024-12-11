import mongoose from 'mongoose';
import { photo } from './../types/photo.type';

type photoWithOutID = Omit<photo,'id'>

export interface IPhotoDocumrnt extends mongoose.Document,photoWithOutID {
    user: mongoose.Types.ObjectId,
    created_at?: Date,
    toPhoto:() => photo
}

export interface IPhotoModel extends mongoose.Model<IPhotoDocumrnt>{
    setAvata: (photo_id: string,user_id: string) => Promise<boolean>
}