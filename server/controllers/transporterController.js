import Goods from "../models/Goods.js";
import User from "../models/User.js";
import Transport from "../models/Transporter.js";

// Get all available goods (for transporters to see)
export const getAvailableGoods = async (req, res) => {
  try {
    // Fetch goods with status 'pending', i.e., those that have not been picked up yet
    const goods = await Goods.find({ status: "pending" }).populate(
      "owner",
      "username email"
    );

    return res.status(200).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Offer transport for a specific good
export const offerTransport = async (req, res) => {
  const transporterId = req.user._id; // Get the ID of the authenticated user
  const { goodsId } = req.params; // Get the goods ID from the URL parameters
  console.log("Goods ID:", goodsId);
  try {
    // Check if the user is a transporter
    const transporter = await User.findById(transporterId);
    if (!transporter || transporter.role !== "transporter") {
      return res
        .status(403)
        .json({ message: "Only transporters can offer transport services" });
    }
    const goods = await Goods.findById(goodsId);
    console.log("Goods ID:", goodsId); // Log the goods ID
    console.log("Goods found:", goods); // Log the found goods
    // Find the good by ID and check its status

    if (!goods || goods.status !== "pending") {
      return res
        .status(404)
        .json({ message: "Goods not found or already in progress" });
    }

    // Check if the transporter has already offered for this good
    const existingOffer = await Transport.findOne({
      transporter: transporterId,
      goods: goodsId,
    });
    if (existingOffer) {
      return res
        .status(400)
        .json({ message: "You have already offered to transport this goods" });
    }

    // Create a new transport offer
    const transportOffer = await Transport.create({
      transporter: transporterId,
      goods: goodsId,
      vehicleType: transporter.vehicleType, // Use the transporter's vehicle type
      capacity: transporter.capacity, // Use the transporter's capacity
      currentLocation: transporter.currentLocation, // Use the transporter's current location
      trackingId: `TRK-${Date.now()}`, // Generate a unique tracking ID
      status: "assigned", // Initial status
    });

    // Optionally, update the good's status to 'in progress' or similar
    goods.status = "in-progress"; // Change this if you want to reflect the offer in the goods status
    await goods.save();

    return res.status(201).json(transportOffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Start the delivery process for a transport offer
export const startDelivery = async (req, res) => {
  const { transportId } = req.params; // Get the transport ID from the URL parameters

  try {
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: "Transport offer not found" });
    }

    transport.status = "in-transit"; // Update the transport status
    transport.deliveryStartTime = new Date(); // Set the start time
    await transport.save(); // Save the updated transport

    return res.status(200).json(transport); // Return the updated transport details
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Complete the delivery process for a transport offer
export const completeDelivery = async (req, res) => {
  const { transportId } = req.params; // Get the transport ID from the URL parameters

  try {
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: "Transport offer not found" });
    }

    transport.status = "delivered"; // Update the transport status to delivered
    transport.deliveryEndTime = new Date(); // Set the end time
    await transport.save(); // Save the updated transport

    // Find the corresponding goods and update its status
    const goods = await Goods.findById(transport.goods);
    if (goods) {
      goods.status = "completed"; // Change the goods status to completed
      await goods.save(); // Save the updated goods
    }

    return res.status(200).json({ message: "Delivery completed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
