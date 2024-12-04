import express from "express";
import { createOrder, verifyPayment } from "./razorpay.js"; // Import necessary functions

const router = express.Router();

// Route to create a Razorpay order
router.post("/create-order", async (req, res) => {
  console.log("Request received for /create-order"); // Debug log
  const { amount } = req.body;
  console.log("Amount:", amount); // Debug log

  try {
    const order = await createOrder(amount);
    res.status(200).json(order); // Send the created order as response
  } catch (error) {
    console.error("Error creating order:", error); // Debug log
    res.status(500).json({ message: "Failed to create Razorpay order", error });
  }
});

// Route to verify payment
router.post("/verify-payment", async (req, res) => {
  console.log("Request received for /verify-payment"); // Debug log
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Incomplete payment details" });
    }

    // Verify the payment using the verifyPayment function
    const isVerified = verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (isVerified) {
      console.log("Payment verified successfully");
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error); // Debug log
    res.status(400).json({ success: false, message: "Payment verification failed", error });
  }
});

export default router;
