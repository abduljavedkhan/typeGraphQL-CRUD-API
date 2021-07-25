import dotenv from 'dotenv'

dotenv.config()

export const databases = [
    {
        id: process.env.DB_ID,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
]