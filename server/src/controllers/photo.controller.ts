import { AuthPayload } from './../middlewares/auth.middleward';
import Elysia, { error, t } from "elysia";
import { ImageHelper } from '../helper/image.helper';
import { PhotoDto } from "../types/photo.type";
import { AuthMiddleWare } from "../middlewares/auth.middleward";
import { PhotoService } from '../services/photo.service';

//const _imageDB: { id: string, data: string, type: string }[] = []

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
})
    .use(PhotoDto)
    .use(AuthMiddleWare)

    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.uplod(file, user_id)
        } catch (error) {
            set.status = 400
            if(error instanceof Error)
                throw error
            throw new Error("Something Wrong!! Try Again")
        }
    }, {
        detail: { summary: "Upload Photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })