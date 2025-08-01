import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connnected")
        )
        await mongoose.connect(`${process.env.MONGODB_URL}/car-rental`)
    } catch (error) {
        console.log(error.message);

    }
}

export default connectDB;