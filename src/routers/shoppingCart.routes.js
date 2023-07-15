import { Router } from "express"
import { insertProductIntoCart } from "../controllers/shoppingCart.controller.js";


const shoppingCartRouter = Router();

shoppingCartRouter.post("/cart", insertProductIntoCart)

export default shoppingCartRouter;