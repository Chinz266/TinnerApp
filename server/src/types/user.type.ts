import Elysia, { Static, t } from "elysia"
import { _register } from "./register.type"
import { _paginator, CeatePagination } from "./pagination.type"

export const _profile = t.Object({
    ...t.Omit(_register,['password']).properties,
    id: t.String(),
    introduction: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.String()),
    created_at: t.Optional(t.String()),
    updated_at: t.Optional(t.String()),

    //todo: implement upload feature
    // photo:
})

export const _user = t.Object({
    ..._profile.properties
    //todo: implemet like featune
    //follwer: porfile[]
    //follwing: porfile[]
})

export const _userAndToken = t.Object({
    user: _user,
    token: t.String()
})

const _userPagination = t.Object({
    ..._paginator.properties,
    user:t.Optional(t.String()),
    min_age:t.Optional(t.Number()),
    max_age:t.Optional(t.Number()),
    looking_for: t.Optional(t.Union([t.Literal('male'), t.Literal('female'), t.Literal('all'),])
)})

export const _updateProfile = t.Omit(_profile,['id', 'username', 'updated_at', 'created_at', 'Last_active', 'age'])
export const _userPaginator = CeatePagination(_user, _userPagination)

export const User = new Elysia().model({
    pagintion: t.Optional(_userPagination),
    updateProfile: _updateProfile,
    users: _userPaginator,
    user: _user
})

export type updateProfile = Static<typeof _updateProfile>
export type userPagination = Static<typeof _userPagination>
export type userPaginator = Static<typeof _userPaginator>
export type user = Static<typeof _user>
