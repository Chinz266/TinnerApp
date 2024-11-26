import Elysia from "elysia";
import { get } from "mongoose";
import { AuthMiddleWare } from "../middlewares/auth.middleward";

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})

    .use(AuthMiddleWare)

    .get('/all', () => {
        return {
            text: "hello Word"
        }
    }, {
        isSignIn: true
    })