import { Router } from "express"
import { insertProduct } from "../controllers/products.controller.js";


const productsRouter = Router()

productsRouter.post('/insert-product', insertProduct);

export default productsRouter;