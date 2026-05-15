import express from 'express';
import protect from '../middleware/protect.js';
import { createOrder, getVendorOrders, getFarmerOrders,updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();


orderRouter.post("/",protect,createOrder);
orderRouter.get("/my",protect,getVendorOrders);
orderRouter.get("/received",protect,getFarmerOrders);
orderRouter.put("/:id",protect,updateOrderStatus);
export default orderRouter;