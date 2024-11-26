import { Elysia, t } from "elysia";
import { example } from "./controllers/example.controller";
import swagger from "@elysiajs/swagger";
import { swaggerConfig } from "./configs/swagger.config";
import { tlsConfig } from "./configs/tls.config";
import cors from "@elysiajs/cors";
import { DataBase_MongoDB } from "./configs/database.config";
import { jwtConfig } from "./configs/jwt.config";
import { AccountController } from "./controllers/account.controller";
import { UserController } from "./controllers/user.controller";


DataBase_MongoDB.connect()

const app = new Elysia()
  .use(cors())
  .use(swaggerConfig)
  .use(jwtConfig)
  //.use(example)
  .use(AccountController)
  .use(UserController)
  
  
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
