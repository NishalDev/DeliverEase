import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Store your Razorpay key in .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Store your Razorpay secret in .env file
});

// Function to create an order
export const createOrder = async (amount) => {
  // Ensure amount is provided and valid
  if (!amount || amount <= 0) {
    throw new Error("Invalid amount provided for the order.");
  }

  const options = {
    amount: amount * 100, // Amount in smallest unit (e.g., 1000 for ₹10.00)
    currency: "INR", // Specify the currency (e.g., INR)
    receipt: `receipt_${Date.now()}`, // Unique identifier for the order
    payment_capture: 1, // Auto-capture payment (1 for auto, 0 for manual)
  };

  try {
    const order = await razorpay.orders.create(options);
    return order; // Return the created order object
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default createOrder;
