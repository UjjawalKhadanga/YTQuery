import { configDotenv } from "dotenv";
configDotenv()

import mongoose from 'mongoose';
import express from "express";
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);

import apiRouter from "./routes/api/index.js";
app.use("/api", apiRouter);

app.listen(8080, () => {
    console.log("Server is running on port 3000")
})