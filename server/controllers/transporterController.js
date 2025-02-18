import Goods from "../models/Goods.js";
import User from "../models/User.js";
import Transport from "../models/Transporter.js";
import Notification from "../models/Notification.js";

// Get all available goods (for transporters to see)
export const getAvailableGoods = async (req, res) => {
  try {
    const goods = await Goods.find({ status: "pending" }).populate(
      "owner",
      "username email"
    );

    return res.status(200).json(goods);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error fetching goods: ${error.message}` });
  }
};

// Offer transport for a specific good
export const offerTransport = async (req, res) => {
  const transporterId = req.user._id;
  const { goodsId } = req.params;
  const { deliveryCharge, vehicleType } = req.body;

  try {
    const transporter = await User.findById(transporterId);
    if (!transporter || transporter.role !== "transporter") {
      return res
        .status(403)
        .json({ message: "Only transporters can offer transport services" });
    }

    const goods = await Goods.findById(goodsId);
    if (!goods || goods.status !== "pending") {
      return res
        .status(404)
        .json({ message: "Goods not found or already in progress" });
    }

    const existingOffer = await Transport.findOne({
      transporter: transporterId,
      goods: goodsId,
    });
    if (existingOffer) {
      return res
        .status(400)
        .json({ message: "You have already offered to transport this goods" });
    }

    if (!vehicleType && !transporter.vehicleType) {
      return res.status(400).json({ message: "Vehicle type is required" });
    }
    const finalVehicleType = vehicleType || transporter.vehicleType;

    if (!deliveryCharge) {
      return res.status(400).json({ message: "Delivery charge is required" });
    }

    const transportOffer = await Transport.create({
      transporter: transporterId,
      goods: goodsId,
      vehicleType: finalVehicleType,
      capacity: transporter.capacity,
      currentLocation: transporter.currentLocation,
      trackingId: `TRK-${Date.now()}`,
      status: "pendingOwnerApproval",
      deliveryCharge,
    });

    goods.status = "in-progress";
    await goods.save();

    try {
      const notification = new Notification({
        type: "offer",
        sender: transporterId,
        recipient: goods.owner,
        message: `A transporter has offered to deliver your goods with a charge of ${deliveryCharge}. Tracking ID: ${transportOffer.trackingId}.`,
        relatedGood: goodsId,
      });
      await notification.save();
    } catch (notificationError) {
      console.error(
        `Failed to save notification: ${notificationError.message}`
      );
    }

    return res.status(201).json({
      message: "Transport offer created successfully",
      transportOffer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating transport offer: ${error.message}` });
  }
};

// Start the delivery process for a transport offer
export const startDelivery = async (req, res) => {
  const { transportId } = req.params;

  try {
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: "Transport offer not found" });
    }

    transport.status = "in-transit";
    transport.deliveryStartTime = new Date();
    await transport.save();

    return res.status(200).json({
      message: "Delivery started successfully",
      transport,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error starting delivery: ${error.message}` });
  }
};

// Complete the delivery process for a transport offer
export const completeDelivery = async (req, res) => {
  const { transportId } = req.params;

  try {
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: "Transport offer not found" });
    }

    transport.status = "delivered";
    transport.deliveryEndTime = new Date();
    await transport.save();

    const goods = await Goods.findById(transport.goods);
    if (goods) {
      goods.status = "completed";
      await goods.save();
    }

    return res.status(200).json({
      message: "Delivery completed successfully",
      transport,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error completing delivery: ${error.message}` });
  }
};

// Additional functions remain unchanged
export const getOffersByGoods = async (req, res) => {
  const { goodsId } = req.params;

  try {
    // Find all transport offers for the specified goodsId and populate the goodName from Goods model
    const offers = await Transport.find({ goods: goodsId })
      .populate("transporter", "username email") // Populating transporter details
      .populate("goods", "name"); // Populating the goodName from the Goods collection

    if (!offers || offers.length === 0) {
      return res.status(404).json({ message: "No offers found for this good" });
    }

    return res.status(200).json(offers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const approveOffer = async (req, res) => {
  const { transportId } = req.params; // Get the transport offer ID from the request parameters

  try {
    // Find the transport offer by ID
    const transportOffer = await Transport.findById(transportId);
    if (!transportOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Update the status of the offer to 'approved'
    transportOffer.status = "approved";
    await transportOffer.save();

    return res
      .status(200)
      .json({ message: "Offer approved successfully", transportOffer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const rejectOffer = async (req, res) => {
  const { transportId } = req.params; // Get the transport offer ID from the request parameters

  try {
    // Find the transport offer by ID
    const transportOffer = await Transport.findById(transportId);
    if (!transportOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Update the status of the offer to 'rejected'
    transportOffer.status = "rejected";
    await transportOffer.save();

    return res
      .status(200)
      .json({ message: "Offer rejected successfully", transportOffer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOfferStatus = async (req, res) => {
  const { offerId } = req.params;

  try {
    const offer = await Transport.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res.status(200).json({ status: offer.status });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllOffersForTransporter = async (req, res) => {
  const transporterId = req.user._id;

  try {
    const offers = await Transport.find({ transporter: transporterId })
      .populate("goods", "name")
      .populate("transporter", "username");

    if (!offers.length) {
      return res.status(404).json({ message: "No transport offers found" });
    }

    return res.status(200).json(offers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOfferById = async (req, res) => {
  const { offerId } = req.params; // Extract the offer ID from the URL

  try {
    // Find the transport offer by its ID and populate related fields (e.g., goods and transporter details)
    const transportOffer = await Transport.findById(offerId)
      .populate("goods", "name description")
      .populate("transporter", "username email vehicleType");

    if (!transportOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res.status(200).json(transportOffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//********************************************************************* */
// import Goods from "../models/Goods.js";
// import User from "../models/User.js";
// import Transport from "../models/Transporter.js";
// import Notification from "../models/Notification.js";
// // Get all available goods (for transporters to see)
// export const getAvailableGoods = async (req, res) => {
//   try {
//     // Fetch goods with status 'pending', i.e., those that have not been picked up yet
//     const goods = await Goods.find({ status: "pending" }).populate(
//       "owner",
//       "username email"
//     );

//     return res.status(200).json(goods);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Offer transport for a specific good
// // export const offerTransport = async (req, res) => {
// //   const transporterId = req.user._id; // Get the ID of the authenticated user
// //   const { goodsId } = req.params; // Get the goods ID from the URL parameters
// //   const { deliveryCharge } = req.body; // Extract deliveryCharge from the request body

// //   try {
// //     // Check if the user is a transporter
// //     const transporter = await User.findById(transporterId);
// //     if (!transporter || transporter.role !== "transporter") {
// //       return res
// //         .status(403)
// //         .json({ message: "Only transporters can offer transport services" });
// //     }

// //     const goods = await Goods.findById(goodsId);
// //     if (!goods || goods.status !== "pending") {
// //       return res
// //         .status(404)
// //         .json({ message: "Goods not found or already in progress" });
// //     }

// //     // Check if the transporter has already offered for this good
// //     const existingOffer = await Transport.findOne({
// //       transporter: transporterId,
// //       goods: goodsId,
// //     });
// //     if (existingOffer) {
// //       return res
// //         .status(400)
// //         .json({ message: "You have already offered to transport this goods" });
// //     }

// //     // Ensure the vehicleType is set correctly
// //     const vehicleType = transporter.vehicleType || req.body.vehicleType; // Get from transporter or request body
// //     if (!vehicleType) {
// //       return res.status(400).json({ message: "Vehicle type is required" });
// //     }

// //     // Ensure deliveryCharge is provided
// //     if (!deliveryCharge) {
// //       return res.status(400).json({ message: "Delivery charge is required" });
// //     }

// //     // Create a new transport offer
// //     const transportOffer = await Transport.create({
// //       transporter: transporterId,
// //       goods: goodsId,
// //       vehicleType: vehicleType, // Use the transporter's vehicle type or from request body
// //       capacity: transporter.capacity,
// //       currentLocation: transporter.currentLocation,
// //       trackingId: `TRK-${Date.now()}`, // Generate a unique tracking ID
// //       status: "pendingOwnerApproval",
// //       deliveryCharge: deliveryCharge, // Pass the delivery charge
// //     });

// //     goods.status = "in-progress";

// //     await goods.save();

// //     return res.status(201).json(transportOffer);
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // };

// // Start the delivery process for a transport offer
// export const startDelivery = async (req, res) => {
//   const { transportId } = req.params; // Get the transport ID from the URL parameters

//   try {
//     const transport = await Transport.findById(transportId);
//     if (!transport) {
//       return res.status(404).json({ message: "Transport offer not found" });
//     }

//     transport.status = "in-transit"; // Update the transport status
//     transport.deliveryStartTime = new Date(); // Set the start time
//     await transport.save(); // Save the updated transport

//     return res.status(200).json(transport); // Return the updated transport details
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Complete the delivery process for a transport offer
// export const completeDelivery = async (req, res) => {
//   const { transportId } = req.params; // Get the transport ID from the URL parameters

//   try {
//     const transport = await Transport.findById(transportId);
//     if (!transport) {
//       return res.status(404).json({ message: "Transport offer not found" });
//     }

//     transport.status = "delivered"; // Update the transport status to delivered
//     transport.deliveryEndTime = new Date(); // Set the end time
//     await transport.save(); // Save the updated transport

//     // Find the corresponding goods and update its status
//     const goods = await Goods.findById(transport.goods);
//     if (goods) {
//       goods.status = "completed"; // Change the goods status to completed
//       await goods.save(); // Save the updated goods
//     }

//     return res.status(200).json({ message: "Delivery completed successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// // Get offers by goodsId
// export const getOffersByGoods = async (req, res) => {
//   const { goodsId } = req.params;

//   try {
//     // Find all transport offers for the specified goodsId
//     const offers = await Transport.find({ goods: goodsId }).populate(
//       "transporter",
//       "username email"
//     );

//     if (!offers || offers.length === 0) {
//       return res.status(404).json({ message: "No offers found for this good" });
//     }

//     return res.status(200).json(offers);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Approve an offer for a specific good
// export const approveOffer = async (req, res) => {
//   const { transportId } = req.params; // Get the transport offer ID from the request parameters

//   try {
//     // Find the transport offer by ID
//     const transportOffer = await Transport.findById(transportId);
//     if (!transportOffer) {
//       return res.status(404).json({ message: "Offer not found" });
//     }

//     // Update the status of the offer to 'approved'
//     transportOffer.status = "approved";
//     await transportOffer.save();

//     return res
//       .status(200)
//       .json({ message: "Offer approved successfully", transportOffer });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Reject an offer for a specific good
// export const rejectOffer = async (req, res) => {
//   const { transportId } = req.params; // Get the transport offer ID from the request parameters

//   try {
//     // Find the transport offer by ID
//     const transportOffer = await Transport.findById(transportId);
//     if (!transportOffer) {
//       return res.status(404).json({ message: "Offer not found" });
//     }

//     // Update the status of the offer to 'rejected'
//     transportOffer.status = "rejected";
//     await transportOffer.save();

//     return res
//       .status(200)
//       .json({ message: "Offer rejected successfully", transportOffer });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const getOfferStatus = async (req, res) => {
//   const { offerId } = req.params;

//   try {
//     const offer = await Transport.findById(offerId);
//     if (!offer) {
//       return res.status(404).json({ message: "Offer not found" });
//     }

//     return res.status(200).json({ status: offer.status });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// export const getAllOffersForTransporter = async (req, res) => {
//   const transporterId = req.user._id;

//   try {
//     const offers = await Transport.find({ transporter: transporterId })
//       .populate("goods", "name")
//       .populate("transporter", "username");

//     if (!offers.length) {
//       return res.status(404).json({ message: "No transport offers found" });
//     }

//     return res.status(200).json(offers);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// export const getOfferById = async (req, res) => {
//   const { offerId } = req.params; // Extract the offer ID from the URL

//   try {
//     // Find the transport offer by its ID and populate related fields (e.g., goods and transporter details)
//     const transportOffer = await Transport.findById(offerId)
//       .populate("goods", "name description")
//       .populate("transporter", "username email vehicleType");

//     if (!transportOffer) {
//       return res.status(404).json({ message: "Offer not found" });
//     }

//     return res.status(200).json(transportOffer);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // export const offerTransport = async (req, res) => {
// //   const transporterId = req.user._id;
// //   const { goodsId } = req.params;
// //   const { deliveryCharge } = req.body;

// //   try {
// //     const transporter = await User.findById(transporterId);
// //     if (!transporter || transporter.role !== "transporter") {
// //       return res
// //         .status(403)
// //         .json({ message: "Only transporters can offer transport services" });
// //     }

// //     const goods = await Goods.findById(goodsId);
// //     if (!goods || goods.status !== "pending") {
// //       return res
// //         .status(404)
// //         .json({ message: "Goods not found or already in progress" });
// //     }

// //     const existingOffer = await Transport.findOne({
// //       transporter: transporterId,
// //       goods: goodsId,
// //     });
// //     if (existingOffer) {
// //       return res
// //         .status(400)
// //         .json({ message: "You have already offered to transport this goods" });
// //     }
// //     const vehicleType = transporter.vehicleType || req.body.vehicleType; // Get from transporter or request body
// //         if (!vehicleType) {
// //           return res.status(400).json({ message: "Vehicle type is required" });
// //         }
// //     const transportOffer = await Transport.create({
// //       transporter: transporterId,
// //       goods: goodsId,
// //       vehicleType: vehicleType,
// //       capacity: transporter.capacity,
// //       currentLocation: transporter.currentLocation,
// //       trackingId: `TRK-${Date.now()}`,
// //       deliveryCharge: deliveryCharge,
// //       status: "pendingOwnerApproval",
// //     });

// //     goods.status = "pendingOwnerApproval";
// //     await goods.save();

// //     // Send notification to the good owner
// //     const notification = new Notification({
// //       user: goods.owner,
// //       message: `A transporter has made an offer to deliver your goods with tracking ID ${transportOffer.trackingId}.`,
// //     });
// //     await notification.save();

// //     return res.status(201).json(transportOffer);
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // };
// export const offerTransport = async (req, res) => {
//   const transporterId = req.user._id; // Get the ID of the authenticated user
//   const { goodsId } = req.params; // Get the goods ID from the URL parameters
//   const { deliveryCharge, vehicleType } = req.body; // Extract deliveryCharge and vehicleType from the request body

//   try {
//     // Check if the user is a transporter
//     const transporter = await User.findById(transporterId);
//     if (!transporter || transporter.role !== "transporter") {
//       return res
//         .status(403)
//         .json({ message: "Only transporters can offer transport services" });
//     }

//     const goods = await Goods.findById(goodsId);
//     if (!goods || goods.status !== "pending") {
//       return res
//         .status(404)
//         .json({ message: "Goods not found or already in progress" });
//     }

//     // Check if the transporter has already offered for this good
//     const existingOffer = await Transport.findOne({
//       transporter: transporterId,
//       goods: goodsId,
//     });
//     if (existingOffer) {
//       return res
//         .status(400)
//         .json({ message: "You have already offered to transport this goods" });
//     }

//     // Check if vehicleType is present in the request body
//     if (!vehicleType && !transporter.vehicleType) {
//       return res.status(400).json({ message: "Vehicle type is required" });
//     }

//     // Use the vehicleType from the request body or the transporter's vehicle type
//     const finalVehicleType = vehicleType || transporter.vehicleType;

//     // Ensure deliveryCharge is provided
//     if (!deliveryCharge) {
//       return res.status(400).json({ message: "Delivery charge is required" });
//     }

//     // Create a new transport offer
//     const transportOffer = await Transport.create({
//       transporter: transporterId,
//       goods: goodsId,
//       vehicleType: finalVehicleType, // Use the finalVehicleType
//       capacity: transporter.capacity,
//       currentLocation: transporter.currentLocation,
//       trackingId: `TRK-${Date.now()}`, // Generate a unique tracking ID
//       status: "pendingOwnerApproval",
//       deliveryCharge: deliveryCharge, // Pass the delivery charge
//     });

//     goods.status = "in-progress";
//     await goods.save();

//     // Send notification to the goods owner
//     const notification = new Notification({
//       type: "offer",
//       sender: transporterId,
//       recipient: goods.owner,
//       message: `A transporter has offered to deliver your goods with a charge of ${deliveryCharge}. Tracking ID: ${transportOffer.trackingId}.`,
//       relatedGood: goodsId,
//     });

//     await notification.save();

//     return res.status(201).json(transportOffer);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
