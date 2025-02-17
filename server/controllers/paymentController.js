// controllers/paymentController.js
import Transport from '../models/Transporter.js'; // Assuming you use this for transport-related models

export const handlePaymentSuccess = async (paymentDetails) => {
  const paymentId = paymentDetails.id;
  const orderId = paymentDetails.order_id;
  const amountPaid = paymentDetails.amount; // In paise, e.g., 10000 = 100.00 INR
  
  // Fetch the related transport or order (using order_id or any identifier you have)
  const transport = await Transport.findOne({ trackingId: orderId });

  if (!transport) {
    throw new Error('Transport not found for this payment');
  }

  // Update the status of the transport to "paid" or whatever suits your model
  transport.status = 'paid'; // or 'approved', depending on your logic
  await transport.save();

  // You could send an email, trigger a notification, or any other necessary action
  console.log(`Payment successful for order ID: ${orderId}`);
};
