import mongoose from "mongoose";

mongoose.set('strictQuery', false); 

const dbConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/LMS");
        if(connection){
            console.log(`Database connected successfully`);   
        }
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}



export default dbConnection;