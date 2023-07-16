import { Router } from "express"
import { getCart, insertOneIntoCart, removeAllById, removeAllFromCart, removeOneFromCart } from "../controllers/shoppingCart.controller.js";


const shoppingCartRouter = Router();

shoppingCartRouter.post("/cart", insertOneIntoCart);
shoppingCartRouter.get("/cart/:id", getCart);
shoppingCartRouter.post("/cart/:id", removeOneFromCart);
shoppingCartRouter.put("/cart/:id", removeAllFromCart);
shoppingCartRouter.put("/cart/:id/:itemId", removeAllById);

export default shoppingCartRouter;