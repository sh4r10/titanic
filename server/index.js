import getPrediction from "./src/get-prediction.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to Titanic Survival Predictor");
});

app.post("/predict", async (req, res) => {
  try {
    const prediction = await getPrediction(req.body);
    res.json(prediction);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.listen(4000, () => console.log("Listening on port", 4000));
