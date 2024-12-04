import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config(); // Load environment variables

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay key ID from .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Razorpay key secret from .env file
});

// Function to create an order
export const createOrder = async (amount) => {
  if (!amount || amount <= 0) {
    throw new Error("Invalid amount provided for the order.");
  }

  const options = {
    amount: amount * 100, // Amount in smallest unit (paise)
    currency: "INR", // Specify the currency
    receipt: `receipt_${Date.now()}`, // Unique identifier for the order
    payment_capture: 1, // Auto-capture payment (1 for auto, 0 for manual)
  };

  try {
    const order = await razorpay.orders.create(options);
    return order; // Return the created order object
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

// Function to verify payment signature
export const verifyPayment = (paymentDetails) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentDetails;

  // Ensure all required details are provided
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new Error("Invalid payment details provided for verification.");
  }

  // Create a hash (HMAC) using Razorpay order ID and payment ID
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // Compare the generated signature with the received signature
  if (generatedSignature === razorpay_signature) {
    return true; // Signature matches, payment is verified
  } else {
    throw new Error("Payment verification failed. Invalid signature.");
  }
};

export default { createOrder, verifyPayment };
