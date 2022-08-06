import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    lastName: String,
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    image: {
      publicId: String,
      secureUrl: String,
    },
    password: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export default mongoose.model("User", UserSchema);
