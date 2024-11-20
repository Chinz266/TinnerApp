import { describe } from "bun:test"
import Elysia, { t } from "elysia"

export const example = new Elysia()
    .get("/", () => "Hello World", {
        detail: {
            tags: ["Example"],
            summary: ("Ronaldo"),
            description: ('Suiiii!!')
        }
    })
    .get("/home", () => "Wowww", {
      
    })
    
    .post("/about", ({ body }) => {
        return {
            id: '111',
            msg: 'hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        }),
        detail: {
            tags: ["Example"],
            summary: ("Messi"),
            description: ('Not_Suiiii!!')
        }

    })
