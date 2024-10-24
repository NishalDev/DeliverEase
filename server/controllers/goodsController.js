import Goods from "../models/Goods.js";
import User from "../models/User.js";
import Transport from "../models/Transporter.js";
import Notification from "../models/Notification.js";
//import fs from "fs";
export const createGoods = async (req, res) => {
  const {
    name,
    quantity,
    price,
    description,
    goodsType,
    size,
    weight,
    pickupLocation,
    dropoffLocation,
    deliveryPrice,
  } = req.body;
  const ownerId = req.user._id;
  //const goodsImage = req.file ? req.file.path : "";
  try {
    const user = await User.findById(ownerId);
    if (!user || user.role !== "goodsOwner") {
      return res
        .status(403)
        .json({ message: "You are not authorized to create goods" });
    }

    const goods = await Goods.create({
      name,
      quantity,
      price,
      description,
      goodsType,
      size,
      weight,
      pickupLocation,
      dropoffLocation,
      deliveryPrice,
      //image: goodsImage,
      owner: ownerId,
    });

    user.goodsOwned.push(goods._id);
    await user.save();

    return res.status(201).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//All goods
export const getAllGoods = async (req, res) => {
  try {
    const goods = await Goods.find().populate("owner", "username email");
    return res.status(200).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Goods of this user
export const getGoods = async (req, res) => {
  const userId = req.user._id;

  try {
    const goods = await Goods.find({ owner: userId }).populate(
      "owner",
      "username email"
    );
    return res.status(200).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getGoodsById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const goods = await Goods.findById(id).populate("owner", "username email");
//     if (!goods) {
//       return res.status(404).json({ message: "Goods not found" });
//     }
//     return res.status(200).json(goods);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// Fetch all goods owned by the current user
// export const getOwnedGoods = async (req, res) => {
//   const ownerId = req.user._id; // Assuming `req.user` contains the authenticated user

//   try {
//     const ownedGoods = await Goods.find({ owner: ownerId });
//     return res.status(200).json(ownedGoods);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const updateGoods = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    quantity,
    price,
    description,
    goodsType,
    size,
    weight,
    pickupLocation,
    dropoffLocation,
    deliveryPrice,
    status,
  } = req.body;
  const ownerId = req.user._id;

  try {
    const goods = await Goods.findById(id);

    if (!goods) {
      return res.status(404).json({ message: "Goods not found" });
    }

    if (goods.owner.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this goods" });
    }
    //goods.image = req.file ? req.file.path : goods.image;
    goods.name = name || goods.name;
    goods.quantity = quantity || goods.quantity;
    goods.price = price || goods.price;
    goods.description = description || goods.description;
    goods.goodsType = goodsType || goods.goodsType;
    goods.size = size || goods.size;
    goods.weight = weight || goods.weight;
    goods.pickupLocation = pickupLocation || goods.pickupLocation;
    goods.dropoffLocation = dropoffLocation || goods.dropoffLocation;
    goods.deliveryPrice = deliveryPrice || goods.deliveryPrice;
    goods.status = status || goods.status;

    await goods.save();
    return res.status(200).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteGoods = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user._id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const goods = await Goods.findById(id);
    console.log("Retrieved goods:", goods);
    if (!goods) {
      return res.status(404).json({ message: "Goods not found" });
    }

    if (goods.owner.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this goods" });
    }

    await Goods.deleteOne({ _id: id });
    return res.status(200).json({ message: "Goods deleted successfully" });
  } catch (error) {
    console.error("Error deleting good:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const respondToOffer = async (req, res) => {
  const { offerId } = req.params; // Get offer ID from the request params
  const ownerId = req.user._id; // Get the current logged-in user ID

  try {
    // Find the transport offer by ID
    // console.log(offerId);
    const transportOffer = await Transport.findById(offerId).populate("goods");

    if (!transportOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Check if the goods belong to the current logged-in owner
    const goods = await Goods.findById(transportOffer.goods._id);

    if (goods.owner.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this offer" });
    }

    // Accept the offer and mark it as "in-transit"
    transportOffer.status = "in-transit";
    await transportOffer.save();

    return res.status(200).json({ message: "Offer accepted", transportOffer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGoodStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const goods = await Goods.findById(id);

    if (!goods) {
      return res.status(404).json({ message: "Goods not found" });
    }

    return res.status(200).json({
      status: goods.status,
      name: goods.name,
      quantity: goods.quantity,
      pickupLocation: goods.pickupLocation,
      dropoffLocation: goods.dropoffLocation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Fetch goods that are currently in transport
export const getGoodsInTransport = async (req, res) => {
  const ownerId = req.user._id;

  try {
    const goodsInTransport = await Goods.find({
      owner: ownerId,
      status: { $in: ["in-progress", "in-transit"] },
    });
    return res.status(200).json(goodsInTransport);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const acceptOffer = async (req, res) => {
  const { offerId } = req.params;

  try {
    const transportOffer = await Transport.findById(offerId);

    if (!transportOffer || transportOffer.status !== "pendingOwnerApproval") {
      return res.status(404).json({ message: "Offer not found or already processed" });
    }

    transportOffer.status = "approved";
    await transportOffer.save();

    // Send notification to the transporter
    const notification = new Notification({
      user: transportOffer.transporter,
      message: `Your offer for transporting goods with tracking ID ${transportOffer.trackingId} has been accepted.`,
    });
    await notification.save();

    return res.status(200).json({ message: "Offer accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to reject an offer
export const rejectOffer = async (req, res) => {
  const { offerId } = req.params;

  try {
    const transportOffer = await Transport.findById(offerId);

    if (!transportOffer || transportOffer.status !== "pendingOwnerApproval") {
      return res.status(404).json({ message: "Offer not found or already processed" });
    }

    transportOffer.status = "rejected";
    await transportOffer.save();

    // Send notification to the transporter
    const notification = new Notification({
      user: transportOffer.transporter,
      message: `Your offer for transporting goods with tracking ID ${transportOffer.trackingId} has been rejected.`,
    });
    await notification.save();

    return res.status(200).json({ message: "Offer rejected successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
