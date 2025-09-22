import express from "express";
import dotenv from "dotenv";
import animaisRoutes from "./src/routes/animaisRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send(`Servidor rodando...`);
});

app.use("/animais", animaisRoutes);

app.listen(serverPort, () => {
    console.log(`Servidor rodando em: http://localhost:${serverPort} `);
});