import express from "express";
import logger from "morgan";
import {createServer} from "node:http";
import { Server } from "socket.io";
import db from './db.js';
import dotenv from "dotenv";
import { error } from "node:console";


dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery : {}
})



io.on("connection", async (socket) => {
    console.log("a user has connected!");

    socket.on("disconnect", () => {
        console.log("an user has disconnected");
    })

    socket.on("chat message", async (msg) => {
        let result
        let username = socket.handshake.auth.username ?? "anonymous"

        try {
            result  = await db.query({
                text: `INSERT INTO messages(content, username) VALUES ($1, $2) RETURNING id, content, username`,
                values: [msg, username],
            });
        } catch (e) {
            console.error(e)
            return
        }
        io.emit("chat message", msg, result.rows[0].id.toString(), username);
    })

    if(!socket.recovered) {
        try {
            const results = await db.query({
                text: "SELECT id, content, username FROM messages WHERE id > $1",
                values: [socket.handshake.auth.serverOffset || 0]
            })

        results.rows.forEach((row) => {
            socket.emit("chat message", row.content, row.id.toString(), row.username)
        })
        } catch (e) {
            console.error(e)
            return
        }
    }
})

app.use(logger("dev"))

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html")
})

server.listen(port, () => {
    console.log(`Server listen on port ${port}`);
})

// Cierra la conexión a la base de datos cuando sea necesario
process.on('SIGINT', () => {
    dbConnection.end((err) => {
        if (err) throw err;
        console.log('Conexión a la base de datos cerrada');
        process.exit();
    });
});