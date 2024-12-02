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
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    currentLocation: {
      type: String,
    },
    deliveryStartTime: {
      type: Date,
    },
    deliveryEndTime: {
      type: Date,
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
      ],
      default: "assigned",
    },
    escrowStatus: {
      type: String,
      enum: ["pending", "funded", "released", "cancelled"],
      default: "pending", // Initial escrow state
    },
    escrowReferenceHash: {
      type: String, // Hash to reference blockchain escrow
    },
    deliveryProgress: [
      {
        timestamp: { type: Date, default: Date.now },
        location: String, // Updates during in-transit status
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to validate dependent fields
transportSchema.pre("save", function (next) {
  if (this.status === "in-transit" && !this.currentLocation) {
    return next(new Error("Current location is required when delivery is in transit."));
  }
  if (this.status === "delivered" && !this.deliveryEndTime) {
    return next(new Error("Delivery end time is required when the delivery is marked as delivered."));
  }
  next();
});

const Transport = mongoose.model("Transport", transportSchema);
export default Transport;
