import Goods from "../models/Goods.js";
import User from "../models/User.js";
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
  const goodsImage = req.file ? req.file.path : "";
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

export const getGoods = async (req, res) => {
  try {
    const goods = await Goods.find().populate("owner", "username email");
    return res.status(200).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGoodsById = async (req, res) => {
  const { id } = req.params;

  try {
    const goods = await Goods.findById(id).populate("owner", "username email");
    if (!goods) {
      return res.status(404).json({ message: "Goods not found" });
    }
    return res.status(200).json(goods);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
