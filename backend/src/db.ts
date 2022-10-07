import fetch from "cross-fetch";
import { Data } from "./types/Data.js";
import { SummaryData } from "./types/SummaryData.js";
import DatabaseConstructor from "better-sqlite3";

// Connect to the database
const db = new DatabaseConstructor("../iot_db.sqlite", {
  verbose: console.log,
  fileMustExist: true,
});

// Create a timestamp on server bootup
const startingTimestamp = Math.floor(new Date().getTime());

// Helper function to check if a table is created
export const tableExists = (tableName: string): boolean => {
  const result = db.pragma(`table_list`);
  const exists = result.findIndex((x: any) => x.name == tableName) > -1;
  console.log(tableName, "exists:", exists);

  return exists;
};

// Get all saved data after server bootup
export const getRecentData = (): { datas: Data[] } => {
  const stmt = db.prepare(`SELECT id, value, time FROM datas WHERE time > ?`);
  const datas = stmt.all(startingTimestamp);
  return { datas };
};

// Save data to database
export const saveData = (data: Data) => {
  if (data) {
    // Get summary data
    let stmt = db.prepare(`SELECT id, count, avgTemp FROM summary`);
    const summary = stmt.all();

    // New sensor data count
    let newCount;
    const sensor = summary.find((x: SummaryData) => x.id === data.id);
    newCount = sensor.count + 1;

    // New sensor avg temp
    const newAverage = sensor.avgTemp + (data.data - sensor.avgTemp) / newCount;

    // Update sensor with new count and and avg temp
    stmt = db.prepare(`UPDATE summary SET count = ?, avgTemp = ? WHERE id = ?`);
    stmt.run(newCount, newAverage, data.id);

    // Add sensor data to all datas
    stmt = db.prepare("INSERT INTO datas VALUES ($id, $time, $value)");
    stmt.run({ id: data.id, time: data.timestamp, value: data.data });
  }
};

// Add up all the rows, count their avg temps and group them by their ids
export const getDataCount = () => {
  const stmt = db.prepare(
    `SELECT COUNT(*) AS count, AVG(value) AS avgTemp, id FROM datas GROUP BY id`
  );
  const datas = stmt.all();
  return { datas };
};

// Create summary table
export const createSummary = () => {
  if (!tableExists("summary")) {
    const stmt = db.prepare(
      `CREATE TABLE IF NOT EXISTS summary(id TEXT, count INT, avgTemp FLOAT)`
    );
    stmt.run();

    const summary = getDataCount();

    if (summary?.datas) {
      const stmt = db.prepare(
        "INSERT INTO summary VALUES ($id, $count, $avgTemp)"
      );
      summary.datas.forEach((item: SummaryData) => {
        stmt.run({ ...item });
      });
    }
  }
};

// Fetch data from external source and save to database
export const fetchData = () => {
  if (tableExists("summary")) {
    fetch("http://dummy-sensors.azurewebsites.net/api/sensor/iddqd")
      .then((response: any) => response.json())
      .then((result: Data) => {
        return saveData(result);
      })
      .catch((err: Error) => console.error("Data fetch error:", err));
  }
};

// Get the temperature difference
export const getDiff = (
  id: string,
  temperature: number
): { differenceInCelsius: number } => {
  const stmt = db.prepare(
    `SELECT * FROM datas WHERE id = ? ORDER BY time ASC LIMIT 1`
  );
  const sensorData = stmt.get(id);

  const diff =
    temperature >= sensorData.value
      ? temperature - sensorData.value
      : sensorData.value - temperature;

  return { differenceInCelsius: diff };
};

// Get the sensor data summary
export const getSummary = (): { datas: SummaryData[] } => {
  if (tableExists("summary")) {
    const stmt = db.prepare(`SELECT id, count, avgTemp FROM summary`);
    const datas = stmt.all();
    return { datas };
  } else {
    return { datas: [] };
  }
};
