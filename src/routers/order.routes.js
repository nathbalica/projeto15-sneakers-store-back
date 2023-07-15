import { Router } from "express";
import { cancelOrder, closeOrder, getOrder } from "../controllers/order.controller";
import { authValidation } from "../middlewares/authValidation.middleware";


const orderRouter = Router()

orderRouter.get('/checkout', authValidation, getOrder);
orderRouter.delete('/checkout', authValidation, closeOrder);
orderRouter.delete('/cancel-checkout', authValidation, cancelOrder);

export default orderRouter