import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connDB = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`connceted To mongoDB host :${connDB.connection.host}`);
  } catch (error) {
    console.log(`DB connect faild : ${error}`);
  }
};

export default connectDB;
