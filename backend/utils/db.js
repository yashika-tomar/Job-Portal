import mongoose from "mongoose";

const connectDB = async () =>{
            try {
                  await mongoose.connect(process.env.MONGO_URI);//connect using the uri in the env file which was taken from mongodb website
                  console.log(`MongoDB connected successfully`);      
            } catch (error) {
                        console.log(error);
  
            }
}
export default connectDB;