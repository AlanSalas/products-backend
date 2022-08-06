import mongoose from "mongoose";
import { DB_URL, DB_CONFIG, DB_NAME } from "./constants.js";

const dbConnection = () => {
  try {
    mongoose.connect(`${DB_URL}`, DB_CONFIG);
    console.log(`Connected to ${DB_NAME}`);
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
