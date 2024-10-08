import mongoose from "mongoose";

const goodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: false },
    description: { type: String },
    goodsType: { type: String, required: false },
    size: { type: String, required: false },
    weight: { type: Number, required: false },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    goodImage: { type: String, required: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    deliveryPrice: { type: Number, required: false },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Goods = mongoose.model("Goods", goodsSchema);
export default Goods;
