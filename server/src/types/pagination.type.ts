import { Static, t, TSchema } from "elysia";

export const _paginator = t.Object({
    pageSize: t.Number(),
    currentPage: t.Number(),
    length: t.Optional(t.Number()),
    
})

export type paginator = Static<typeof _paginator>
export function CeatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginatorType: U) {
    return t.Object({
        items: t.Array(itemType),
        pagination: paginatorType
    })
}