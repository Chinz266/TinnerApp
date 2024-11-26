import mongoose from "mongoose"
import { userPagination } from "../types/user.type"
import { IUserDocumet } from "../interfaces/user.interface"

export const QueryHelper = {

    _parseUserQuery: function (query: userPagination): mongoose.FilterQuery<IUserDocumet>[] {
        const filter: mongoose.FilterQuery<IUserDocumet>[] = []

        if (query.user) {
            const regEx = new RegExp(query.user.trim(), 'i') // i = case-insensitive
            const _filter = { username: { $regex: regEx } }
            filter.push(_filter)
        }
        if (query.looking_for) {
            const regEx = new RegExp(`\\b${query.looking_for.trim()}`, 'i')
            const _filter = { looking_for: { $regex: regEx } }
            filter.push(_filter)
        }

        const age_filter: {
            $lte?: Date //$lte (Less Than or Equal)
            $gte?: Date //$gte (Greater Than or Equal)
        } = {}
        if (query.min_age) {
            const today = new Date()
            const min_birth_date = new Date(today.setFullYear(today.getFullYear() - query.min_age))
            age_filter.$lte = min_birth_date
        }
        if (query.max_age) {
            const today = new Date()
            const max_birth_date = new Date(today.setFullYear(today.getFullYear() - query.max_age))
            age_filter.$gte = max_birth_date
        }
        if (age_filter.$gte || age_filter.$lte)
            filter.push({ date_of_birth: age_filter })

        return filter
    },
    get parseUserQuery_1() {
        return this._parseUserQuery
    },
    set parseUserQuery_1(value) {
        this._parseUserQuery = value
    },
    get parseUserQuery() {
        return this._parseUserQuery
    },
    set parseUserQuery(value) {
        this._parseUserQuery = value
    },

}