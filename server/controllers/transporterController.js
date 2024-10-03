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

export const offerTransport = async (req, res) => {
  const transporterId = req.user._id;
  const { goodsId } = req.params;

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

    const transportOffer = await Transport.create({
      transporter: transporterId,
      goods: goodsId,
      vehicleType: transporter.vehicleType,
      capacity: transporter.capacity,
      currentLocation: transporter.currentLocation,
      trackingId: `TRK-${Date.now()}`,
      status: "assigned",
    });

    return res.status(201).json(transportOffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

    return res.status(200).json(transport);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
    goods.status = "completed";
    await goods.save();

    return res.status(200).json({ message: "Delivery completed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
