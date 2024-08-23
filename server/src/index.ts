import express, { Application } from "express";
import gameRoutes from "./routes/game";
import cors from "cors";

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Roulette Game Server!");
});

app.use("/api/game", gameRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
