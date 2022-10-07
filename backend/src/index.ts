import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import {
  getDataCount,
  getRecentData,
  getSummary,
  getDiff,
  fetchData,
  createSummary,
} from "./db.js";
import fetch from "cross-fetch";
import { TemperatureData } from "./types/TemperatureData.js";
dotenv.config();

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// Default endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "alive" });
});

// Endpoint for counting the data
app.get("/count", (req: Request, res: Response) => {
  try {
    const response = getDataCount();
    return res.json(response);
  } catch (err: any) {
    console.error("Error getting the data count:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

// Endpoint for getting the recently saved data
app.get("/recent", (req: Request, res: Response) => {
  try {
    const response = getRecentData();
    return res.json(response);
  } catch (err: any) {
    console.error("Error getting the recent data:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

// Endpoint for getting the summary data
app.get("/summary", (req: Request, res: Response) => {
  try {
    const response = getSummary();
    return res.json(response);
  } catch (err: any) {
    console.error("Error getting the summary data:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

// Endpoint for getting the selected sensor temp difference compared to Helsinki
app.get("/diff/:id", (req: Request, res: Response) => {
  try {
    fetch("http://dummy-sensors.azurewebsites.net/api/weather")
      .then((response: any) => response.json())
      .then((result: TemperatureData) => {
        const response = getDiff(req.params.id, result.temperature);
        return res.json(response);
      });
  } catch (err: any) {
    console.error("Error getting the diff data:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

// Setup the port and listen connections
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set the interval to fetch data every second
const interval = setInterval(() => {
  fetchData();
}, 1000);

// Create summary table on server bootup for faster loading times
createSummary();
