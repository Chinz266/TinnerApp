import Elysia, { error, t } from "elysia";
import { get } from "mongoose";

export const ErrControlloer = new Elysia({
    prefix: '/api/error',
    tags: ['Error'],
})
    .get('/:code', ({ params }) => {
        return error(params.code)
    },{
        params: t.Object({code: t.Number()})
    })