import { ObjectId } from "mongodb";
import { db } from "../database/db.js";

export async function insertProductIntoCart(req, res) {
    const { userId, item } = req.body;

    if (!userId || !item) return res.sendStatus(422);

    try {

        const update = await db.collection("cart").updateOne({ userId }, { $push: { itens: item } });
        if (update.matchedCount === 0) { // se não encontrou para atualizar
            await db.collection("cart").insertOne({ userId, itens: [item] })
        }
        res.status(201).send('Inserido com sucesso!');

    } catch (err) {
        res.status(500).send(err.message);
    }
}