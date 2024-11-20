import { connect } from "bun"
import mongoose from "mongoose"

const Username = Bun.env.MONGO_DB_User || 'your-username'
const Password = Bun.env.MONGO_DB_Password || 'your-password'
const DB_Name = Bun.env.MONGO_DBNAME || 'tinner_app'

const data_uri = `mongodb+srv://${Username}:${Password}@cluster0.e3ovd.mongodb.net/?retryWrites=true&w=majority&appName=${DB_Name}`

export const DataBase_MongoDB = {
    connect: async () => {
        try {
            await mongoose.connect(data_uri)
            console.log('=== MonggoDB Connected ===');
        } catch (error) {
            console.log('--- MonggoDB Connection err ---');
            console.log(error);
            
        }
    }
}