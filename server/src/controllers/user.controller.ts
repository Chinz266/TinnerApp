import Elysia from "elysia";
import { get, Query } from "mongoose";
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleward";
import { UserDto } from "../types/user.type";
import { UserService } from "../services/user.service";

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})

    .use(AuthMiddleWare)
    .use(UserDto)

    .get('/all', () => {
        return {
            user: [
                { id: '1212', name: 'a' },
                { id: '1211', name: 'b' },
            ]
        }
    })

    .get('/', ({query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query,user_id)
    }, {
        
        detail: { summary: "Get user"},
        query:"pagination",
        response: "users",
        isSignIn: true,
    })

    .patch('/',async ({body,set,Auth})=>{ 
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error ("Somthing went wrong!!")

        }
     }, {
        detail: {summary: "Update Profile"},
        body: "updateProfile",
        //response: "user",
        isSignIn: true,
    })