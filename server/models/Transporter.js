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
      enum: ["truck", "van", "bike"],
      default: "truck", // Add your valid vehicle types
      required: true,
    },
    currentLocation: { type: String, required: false },
    deliveryStartTime: { type: Date, required: false },
    deliveryEndTime: { type: Date, required: false },
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
