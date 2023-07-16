import { ObjectId } from "mongodb";
import { db } from "../database/db.js";

export async function insertOneIntoCart(req, res) {
    const { userId, item } = req.body;

    if (!userId || !item) return res.status(422).send("Preencha o id do item");

    try {

        const productExists = await db.collection("products").findOne({ _id: new ObjectId(item) });
        if (!productExists) return res.status(404).send("O produto não existe!");

        const update = await db.collection("cart").updateOne({ userId }, { $push: { itens: item } });
        if (update.matchedCount === 0) { // se não encontrou para atualizar
            await db.collection("cart").insertOne({ userId, itens: [item] })
        }
        res.status(201).send('Inserido com sucesso!');

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCart(req, res) {
    const { id } = req.params;

    try {
        const cart = await db.collection("cart").findOne({ userId: id });
        if (!cart) res.status(404).send("Carrinho ainda não criado!");
        res.send(cart);

    } catch (error) {
        res.status(500).send(err.message);
    }
}

export async function removeOneFromCart(req, res) {
    const { id } = req.params;
    const { itemId } = req.body;

    try {
        //const update = await db.collection("cart").updateOne({ userId: id }, { $pull: { itens: itemId } });
        //if (update.matchedCount === 0) return res.status(404).send("Carrinho não encontrado!");
        
        const cart = await db.collection("cart").findOne({userId: id});
        if (!cart) return res.status(404).send("Carrinho não encontrado!");

        const itensCpy = [...cart.itens];
        const indexRemove = itensCpy.indexOf(itemId);
        itensCpy.splice(indexRemove, 1);
        
        const update = await db.collection("cart").updateOne({ userId: id }, {$set: { itens: itensCpy }});
        if (update.matchedCount === 0) return res.status(404).send("O produto não existe!");

        res.status(204).send("Item removido com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function removeAllById(req, res) {
    const { id, itemId } = req.params;

    try {
        const update = await db.collection("cart").updateOne({ userId: id }, { $pull: { itens: itemId } });
        if (update.matchedCount === 0) return res.status(404).send("Carrinho não encontrado!");

        res.status(204).send("Itens removidos com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function removeAllFromCart(req, res) {
    const { id } = req.params;

    try {
        const update = await db.collection("cart").updateOne({ userId: id }, { $set: { itens: [] } });
        if (update.matchedCount === 0) return res.status(404).send("Carrinho não encontrado!");

        res.status(204).send("Carrinho esvaziado com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }
}