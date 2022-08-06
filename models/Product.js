import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: String,
    price: Double,
    description: String,
    image: {
      publicId: String,
      secureUrl: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { versionKey: false }
);

export default mongoose.model("Product", ProductSchema);
