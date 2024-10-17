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
      enum: [
        "assigned",
        "in-transit",
        "delivered",
        "approved",
        "pendingOwnerApproval",
        "rejected",
        "cancelled",
      ], // Add 'approved' to the enum values
      default: "assigned", // Initial status waiting for goods owner approval
    },
  },
  { timestamps: true }
);

const Transport = mongoose.model("Transport", transportSchema);
export default Transport;
