import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransportService from "../Services/TransportService.js"; // Import TransportService for API calls

const OfferApprovalPage = () => {
  const navigate = useNavigate();
  const { goodsId } = useParams();  // Get goodsId from the URL
  const [goodName, setGoodName] = useState(""); // State for good name
  const [offers, setOffers] = useState([]);
  
  // Fetch the good name and offers using goodsId
  useEffect(() => {
    const fetchGoodNameAndOffers = async () => {
      try {
        const response = await TransportService.getOffersByGoods(goodsId); // Fetch offers by goodsId
        const goodData = response[0]; // Assuming the first response contains the good data
        setGoodName(goodData.goods.name); // Set the good name
        setOffers(response); // Set the offers
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchGoodNameAndOffers();
  }, [goodsId]);

  const handlePayment = () => {
    // Redirect to PaymentPage.js, passing goodName and other data via location.state
    navigate("/payment", {
      state: {
        goodsId: goodsId,
        goodName: goodName,
        deliveryCharge: offers[0]?.deliveryCharge, // Assuming you have this data in the offers
      },
    });
  };

  return (
    <div>
      <h1>Offers for Your Goods: {goodName}</h1> {/* Displaying goodName here */}
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default OfferApprovalPage;
