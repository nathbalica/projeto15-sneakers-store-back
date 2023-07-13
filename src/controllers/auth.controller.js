import { db } from "../database/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const existEmail = await db.collection("users").findOne({ email })
        if (existEmail) return res.status(409).send("E-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({ name, email, password: hash })
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const existUser = await db.collection('users').findOne({ email })
        if (!existUser) return res.status(404).send("Email não esta cadastrado")

        const correctPassword = bcrypt.compareSync(password, existUser.password)
        if (!correctPassword) return res.status(401).send("Senha incorreta")


        const token = uuid();
        await db.collection("sessions").insertOne({ token, userId: existUser._id })

        res.status(200).send({ token, userName: existUser.name });

    } catch (err) {
        res.status(500).send(err.message);
    }

}

