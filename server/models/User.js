import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["goodsOwner", "transporter"],
      default: "goodsOwner",
    },
    phone: {
      type: String,
    },
    goodsOwned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goods",
      },
    ],
    vehicleType: {
      type: String,
      required: false, // Make this optional
    },
    capacity: {
      type: Number,
      required: false, // Make this optional
    },
    currentLocation: {
      type: String,
      required: false, // Make this optional
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to update user role
userSchema.methods.updateRole = async function (newRole, vehicleData) {
  this.role = newRole;

  // Only set vehicle details if the role is 'transporter'
  if (newRole === "transporter") {
    this.vehicleType = vehicleData.vehicleType;
    this.capacity = vehicleData.capacity;
    this.currentLocation = vehicleData.currentLocation;
  } else {
    // If switching back to goodsOwner, clear the transporter-specific fields
    this.vehicleType = undefined;
    this.capacity = undefined;
    this.currentLocation = undefined;
  }

  await this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
