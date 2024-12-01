import React, { useState } from "react";
import '../css/PaymentPage.css'; // Optional: Your CSS styling

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    try {
      if (amount <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      // Call your backend API to initiate payment
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentStatus("Payment Successful!");
      } else {
        setPaymentStatus("Payment Failed!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("An error occurred during the payment process.");
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      <div className="payment-form">
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="1"
            placeholder="Enter amount"
          />
        </label>

        <label>
          Payment Method:
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>

        <button onClick={handlePayment}>Pay Now</button>

        <div className="payment-status">
          {paymentStatus && <p>{paymentStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
