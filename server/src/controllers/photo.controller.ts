import { AuthPayload } from './../middlewares/auth.middleward';
import Elysia, { t } from "elysia";
import { PhotoDto } from "../types/photo.type";
import { AuthMiddleWare } from "../middlewares/auth.middleward";
import { PhotoService } from '../services/photo.service';
import { set } from 'mongoose';

//const _imageDB: { id: string, data: string, type: string }[] = []

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
})
    .use(PhotoDto)
    .use(AuthMiddleWare)

    .patch('/:photo_id', async ({ params: { photo_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await PhotoService.setAvatar(photo_id,user_id)
            set.status = "No Content"
        } catch (error) {
            set.status = 400
            if (error instanceof Error)
                throw error
            throw new Error("Something Wrong!! Try Again")
        }
    }, {
        detail: { summary: "Set Avatar" },
        isSignIn: true,
        params: "photo_id",
    })

    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = "No Content"
        } catch (error) {
            set.status = 400
            if (error instanceof Error)
                throw error
            throw new Error("Something Wrong!! Try Again")
        }
    }, {
        detail: { summary: "Delete photo by photo_id" },
        isSignIn: true,
        params: "photo_id"
    })

    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.getPhotos(user_id)
    }, {
        detail: { summary: "Get photo[] by user_id" },
        isSignIn: true,
        response: "photos",
    })

    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.uplod(file, user_id)
        } catch (error) {
            set.status = 400
            if (error instanceof Error)
                throw error
            throw new Error("Something Wrong!! Try Again")
        }
    }, {
        detail: { summary: "Upload Photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })