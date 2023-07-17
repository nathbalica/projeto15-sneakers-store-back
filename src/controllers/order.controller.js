import { db } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function getOrder ( req, res ) {
    const { userId } = res.locals.session;

    try{

        const userCart = await db.collection("cart").findOne({ userId }); //VERIFICAR SE É USERID MESMO O NOME DA PROPRIEDADE USADA
        const items = userCart.itens.map(async id => {
            try{
                const item = await db.collection("products").findOne({ _id: new ObjectId(id) });
                return item;
            } catch (err) {
                return res.status(500).send(err.message);
            }
        })

        return res.status(200).send(items);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function closeOrder ( req, res ) {
    const { userId } = res.locals.session

    try{

        await db.collection("order").deleteOne({ userId }); //VERIFICAR SE É USERID MESMO O NOME DA PROPRIEDADE USADA
        await db.collection("cart").deleteMany({ userId });

        res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function cancelOrder ( req, res ) {
    const { userId } = res.locals.session;

    try{

        await db.collection("order").deleteOne({ userId }); //VERIFICAR SE É USERID MESMO O NOME DA PROPRIEDADE USADA

        res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}