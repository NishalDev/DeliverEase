import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
  {
    transporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goods: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
      required: true,
    },
    trackingId: {
      type: String,
      unique: true,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    currentLocation: { type: String },
    deliveryStartTime: { type: Date },
    deliveryEndTime: { type: Date },
    status: {
      type: String,
      enum: ["assigned", "in-transit", "delivered"],
      default: "assigned",
    },
  },
  { timestamps: true }
);

const Transport = mongoose.model("Transport", transportSchema);
export default Transport;
