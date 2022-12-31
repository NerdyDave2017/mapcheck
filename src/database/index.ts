import mongoose from "mongoose";

require("dotenv").config();
const config = require("../config");

//  remember to replace with appropriate names
let username : string = config.mongoDb.mongoUser;
let password : string = config.mongoDb.mongoPass;

const MONGO_URI : string = `mongodb+srv://${username}:${password}@cluster0.tnwwg.mongodb.net/foodie?retryWrites=true&w=majority`;


const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err : any) {
    console.log("Connection broken");
    console.log(err);
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
