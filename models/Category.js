import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

export default mongoose.model("Category", CategorySchema);
