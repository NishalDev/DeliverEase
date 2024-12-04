import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initWeb3, deposit, getAccount } from "../Services/web3"; // Import web3 methods
const API_URL = "http://localhost:5002/api/payment";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deliveryCharge, goodsId, goodName } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize Web3 when the component loads
  useEffect(() => {
    if (!deliveryCharge || !goodsId || !goodName) {
      setError("Invalid payment details.");
      return;
    }

    initWeb3(); // Initialize Web3 (connect to MetaMask)
  }, [deliveryCharge, goodsId, goodName]);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Step 1: Create a Razorpay order via backend API
      const orderResponse = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        body: JSON.stringify({
          amount: deliveryCharge, // Amount to be paid in INR (converted to paise)
          goodsId,
          goodName,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const order = await orderResponse.json();

      // Step 2: Configure Razorpay options
      const options = {
        key: "rzp_test_BlJfHq0egoeqt9", // Replace with your Razorpay key
        amount: order.amount, // Amount in paise (100 paise = 1 INR)
        currency: order.currency,
        name: "DeliverEase",
        description: `Payment for Good: ${goodName}`,
        image: "https://yourdomain.com/your-logo.png", // Optional logo
        order_id: order.id, // Order ID from the backend
        handler: async function (response) {
          console.log("Payment success:", response);

          // Step 3: Web3 integration - Make payment via smart contract (Escrow)
          try {
            const account = await getAccount(); // Get the user's Ethereum account

            // Call deposit function from your web3.js service (Escrow contract deposit)
            await deposit(deliveryCharge, account);

            // Step 4: Verify payment on the backend
            const verifyResponse = await fetch(`${API_URL}/verify-payment`, {
              method: "POST",
              body: JSON.stringify(response),
              headers: { "Content-Type": "application/json" },
            });

            const verificationResult = await verifyResponse.json();
            if (verificationResult.success) {
              alert("Payment successful and verified!");
              navigate("/payment-success", { state: { goodsId, goodName } });
            } else {
              alert("Payment verification failed.");
            }
          } catch (verificationError) {
            console.error("Payment verification failed:", verificationError);
            alert(
              "Payment successful, but verification failed. Please contact support."
            );
          }
        },
        prefill: {
          name: "John Doe", // Replace with dynamic user data if available
          email: "john.doe@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: () => {
            alert("Payment process interrupted. Try again.");
          },
        },
      };

      // Step 5: Initialize and open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setError("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
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
