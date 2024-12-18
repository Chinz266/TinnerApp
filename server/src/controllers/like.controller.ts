import Elysia from "elysia";
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleward";
import { UserDto } from "../types/user.type";
import { LikeService } from "../services/like.service";

export const LinkController = new Elysia({
    prefix: "api/like",
    tags: ['like']
})
.use(AuthMiddleWare)
.use(UserDto)

.put('/',async ({body:{target_id},set,Auth}) => {
    try {
        const user_id = (Auth.payload as AuthPayload).id
        await LikeService.toggleLike(user_id,target_id)
        set.status = 204
    } catch (error) {
        set.status = 400
        throw error
    }
},{
    detail: {summary: "Toggle Like"},
    isSignIn: true,
    body: "target_id"
})

