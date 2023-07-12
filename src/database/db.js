import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    console.log('Conectado ao banco de dados');
} catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
}


export const db = mongoClient.db();
