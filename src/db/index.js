import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connnectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log(`\n MONGODB Connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch(err){
        console.log("MONGODB connection error:",err);
        process.exit(1);
    }
}

export default connnectDB;