import { register } from './../types/account.type'
import Elysia from "elysia"
import { AccountDto } from "../types/account.type"
import { AccountService } from '../services/account.service'
import { jwtConfig } from '../configs/jwt.config'

export const AccountController = new Elysia({
    prefix: '/api/account',
    tags: ['Account']
})
    .use(jwtConfig)
    .use(AccountDto)
    .post('/login', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.login(body)
            const token = await jwt.sign({id:user.id})
            return {user, token}
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error) {
                throw Error
            }
            set.status = "Internal Server Error"
            throw new Error("Someting went wrong, Try again")
        }
    }, {
        detail: { summary: "Login" },
        body: "login",
        response: "user_and_token"
    })

    .post('/register', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.createNewUser(body)
            const token = await jwt.sign({ id: user.id })
            return { token, user }

        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('something went wrong, try again later')
        }

    }, {
        body: "register",
        response: "user_and_token",
        detail: { summary: "Create new user", },

        beforeHandle: ({ body: { username, password }, set }) => {
            const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,9}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
            if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
                set.status = "Bad Request"
                throw new Error(`Invalid username or password`)
            }
        },

    })