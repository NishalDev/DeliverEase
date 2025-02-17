import express from 'express';

const router = express.Router();

export default router;


//Transporter offered a price for good
//Good owner accepts it and he redirected to payment page
//he pays using payement gateway (API) and the transaction follows escrow method to hold the payment until the condition satisfies