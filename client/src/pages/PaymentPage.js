import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const API_URL = "http://localhost:5002/api/payment";
const PaymentPage = () => {
  const location = useLocation();
  const { deliveryCharge, goodsId, goodName } = location.state || {};
  console.log(goodName);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!deliveryCharge || !goodsId || !goodName) {
      setError("Invalid payment details");
      return;
    }
  }, [deliveryCharge, goodsId, goodName]);

  // Create a Razorpay order and trigger payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Call your backend to create an order (you need to create this API)
      const orderData = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        body: JSON.stringify({
          amount: deliveryCharge, // Convert to paise
          goodsId,
          goodName,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(orderData);
      const order = await orderData.json();
      console.log(order);
      console.log(window.Razorpay);
      // 2. Configure Razorpay options
      const options = {
        key: "rzp_test_BlJfHq0egoeqt9", // Your Razorpay key (from the Razorpay dashboard)
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "Your Company Name",
        description: `Payment for ${goodName}`,
        image: "https://yourdomain.com/your-logo.png",
        order_id: order.id, // Order ID from the backend
        handler: async function (response) {
          // Handle successful payment response here
          console.log("Payment success:", response);
          // You can send the payment details to the backend to verify and store the payment status
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#F37254",
        },
      };

      // 3. Trigger Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      setError("Failed to initiate payment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Payment for Good: {goodName}</h2>
      <p>Delivery Charge: ₹{deliveryCharge}</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Proceed to Pay"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PaymentPage;
