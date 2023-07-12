import { Router } from "express"
import authRouter from "./auth.routes.js"
import orderRouter from "./order.routes.js"
import productsRouter from "./products.routes.js"
import shoppingCartRouter from "./shoppingCart.routes.js"

const router = Router()

router.use(authRouter)
router.use(orderRouter)
router.use(productsRouter)
router.use(shoppingCartRouter)

export default router;
