import Order from "../models/Order.js";
import Produce from "../models/Produce.js";
import mongoose from "mongoose";

const createOrder = async (req, res) => {

    try {

        if (req.user.role !== "vendor") {
            return res.status(403).json({
                message: "Only vendors can place orders"
            });
        }

        const { item, quantity } = req.body;
        if (!mongoose.Types.ObjectId.isValid(item)) {
            return res.status(400).json({
                message: "Invalid produce ID"
            });
        }
        const produce = await Produce.findById(item);

        if (!produce) {
            return res.status(404).json({
                message: "Produce not found"
            });
        }

        if (!produce.isAvailable) {
            return res.status(400).json({
                message: "Produce unavailable"
            });
        }

        const totalPrice = quantity * produce.price;

        const order = await Order.create({

            item: produce._id,

            farmer: produce.farmer,

            vendor: req.user._id,

            quantity,

            totalPrice

        });

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getVendorOrders = async (req, res) => {

    try {

        if (req.user.role !== "vendor") {
            return res.status(403).json({
                message: "Only vendors can view placed orders"
            });
        }

        const orders = await Order.find({
            vendor: req.user._id
        })
            .populate("item")
            .populate("farmer", "name email");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getFarmerOrders = async (req, res) => {

    try {

        if (req.user.role !== "farmer") {
            return res.status(403).json({
                message: "Only farmers can view received orders"
            });
        }

        const orders = await Order.find({
            farmer: req.user._id
        })
            .populate("item")
            .populate("vendor", "name email");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        if (req.user.role !== "farmer") {
            return res.status(403).json({
                message: "Only farmers can update order status"
            });
        }
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.farmer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: `Order ${status}`,
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
export { createOrder, getVendorOrders, getFarmerOrders, updateOrderStatus };