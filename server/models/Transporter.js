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
      // Default vehicle type
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true, // Ensure delivery charge is always provided
    },
    currentLocation: {
      type: String,
      // required: function () {
      //   return this.status === "in-transit"; // Current location is required once delivery starts
      // },
    },
    deliveryStartTime: {
      type: Date,
      // required: function () {
      //   return this.status === "in-transit"; // Start time is required once the delivery starts
      // },
    },
    deliveryEndTime: {
      type: Date,
      // required: function () {
      //   return this.status === "delivered"; // End time is required once the delivery ends
      // },
    },
    status: {
      type: String,
      enum: ["pendingOwnerApproval", "assigned", "in-transit", "delivered"],
      default: "pendingOwnerApproval", // Initial status waiting for goods owner approval
    },
  },
  { timestamps: true }
);

const Transport = mongoose.model("Transport", transportSchema);
export default Transport;
