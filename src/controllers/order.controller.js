import { db } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function getOrder(req, res) {
    const { userId } = res.locals.session;

    const user = userId.toString();
  
    try {
      const userCart = await db.collection("cart").findOne({ userId: user });
      const itemIds = userCart.itens; // Nota: corrigi o nome da propriedade de "itens" para "itemIds" para manter a consistência
      const itemPromises = itemIds.map(async (id) => {
        try {
          const item = await db.collection("products").findOne({ _id: new ObjectId(id) });
          return item;
        } catch (err) {
          throw err;
        }
      });
  
      const items = await Promise.all(itemPromises);
      console.log('items:           ', items);
  
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