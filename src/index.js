import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/api.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 2024;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan" });
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
