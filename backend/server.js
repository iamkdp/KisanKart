import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/authRoute.js"
import produceRouter from "./routes/produceRoute.js";

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,
    () => {
        console.log(` listening on port ${PORT}`);
    }
)

app.use("/api/auth", router);

app.use("/api/produce", produceRouter);
app.get("/auth/health", (req, res) => {
    res.json({ status: 'ok' });
})

