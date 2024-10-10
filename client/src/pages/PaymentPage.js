import React, { useState } from 'react';
import '../css/main.css'; // Import the CSS file
import BackButton from '../components/BackButton';

const initialTransactions = [
  { id: 1, date: '2024-09-15', amount: 5000, status: 'Completed', method: 'Credit Card' },
  { id: 2, date: '2024-09-20', amount: 2000, status: 'Pending', method: 'Bank Transfer' },
  { id: 3, date: '2024-09-25', amount: 1500, status: 'Completed', method: 'UPI' },
];

const PaymentPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [paymentDetails, setPaymentDetails] = useState({ amount: '', method: 'Credit Card', cardNumber: '', expiry: '', cvv: '' });
  const [showTransactionHistory, setShowTransactionHistory] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString(),
      amount: paymentDetails.amount,
      status: 'Completed',
      method: paymentDetails.method,
    };
    setTransactions([...transactions, newTransaction]);
    setPaymentDetails({ amount: '', method: 'Credit Card', cardNumber: '', expiry: '', cvv: '' });
  };

  return (
    <div className="payment-page">
      <BackButton /> {/* Add the Back Button here */}
      <h1>Payment Page</h1>

      <div className="payment-summary">
        <h2>Outstanding Balance</h2>
        <p>$3,500</p> {/* Replace with dynamic outstanding balance data */}
      </div>

      <div className="payment-method-form">
        <h2>Make a Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={paymentDetails.amount}
            onChange={handleInputChange}
            required
          />
          
          <select name="method" value={paymentDetails.method} onChange={handleInputChange}>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          
          {paymentDetails.method === 'Credit Card' || paymentDetails.method === 'Debit Card' ? (
            <>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry (MM/YY)"
                value={paymentDetails.expiry}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                required
              />
            </>
          ) : null}

          <button type="submit">Pay Now</button>
        </form>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        <button onClick={() => setShowTransactionHistory(!showTransactionHistory)}>
          {showTransactionHistory ? 'Hide' : 'Show'} Transaction History
        </button>
        {showTransactionHistory && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
