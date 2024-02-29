import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)//To establish the connection between the mongoDB database and mongoose/server
        console.log(`Connect to MongoDB ${conn.connection.host}`.bgMagenta.white)
    }
    catch (err) {
        console.log(`Error:${err}`.bgRed.white)
    }
};

export default connectDB