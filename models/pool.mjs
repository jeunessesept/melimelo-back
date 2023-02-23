import pg from "pg"  
import dotenv from "dotenv"  
dotenv.config()  
   
export const pool = new pg.Pool ({  
    database: process.env.DB_NAME,  
    user: process.env.DB_USERNAME,  
    password: process.env.DB_PASSWORD,  
})  