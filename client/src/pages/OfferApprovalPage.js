// src/pages/OfferApprovalPage.js
import React, { useState, useEffect } from "react";
import TransportService from "../Services/TransportService.js"; // Import TransportService for API calls
import { useParams } from "react-router-dom";
import "../css/OfferApprovalPage.css"; // Assuming you have a CSS file for custom styles

const OfferApprovalPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { goodsId } = useParams(); // Get goodsId from the URL

  // Fetch the offers for the specified goods
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await TransportService.getOffersByGoods(goodsId); // Fetch offers for the given goods
        setOffers(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to load offers.");
        setLoading(false);
      }
    };
    fetchOffers();
  }, [goodsId]);

  const handleApprove = async (offerId) => {
    try {
      await TransportService.approveOffer(offerId); // Call API to approve the offer
      alert("Offer approved successfully!");
      setOffers(offers.filter((offer) => offer._id !== offerId)); // Remove the approved offer from the list
    } catch (err) {
      setError("Failed to approve offer.");
    }
  };

  const handleReject = async (offerId) => {
    try {
      await TransportService.rejectOffer(offerId); // Call API to reject the offer
      alert("Offer rejected.");
      setOffers(offers.filter((offer) => offer._id !== offerId)); // Remove the rejected offer from the list
    } catch (err) {
      setError("Failed to reject offer.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="offer-approval-page">
      <h1>Offers for Your Goods</h1>
      {offers.length === 0 ? (
        <p>No offers available for this goods.</p>
      ) : (
        <div className="table-container">
          <table className="offer-table">
            <thead>
              <tr>
                <th>Transporter</th>
                <th>Vehicle Type</th>
                <th>Delivery Charge</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id}>
                  <td>{offer.transporter.username}</td>
                  <td>{offer.vehicleType}</td>
                  <td>${offer.deliveryCharge}</td>
                  <td className={`status ${offer.status}`}>{offer.status}</td>
                  <td>
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(offer._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(offer._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OfferApprovalPage;
