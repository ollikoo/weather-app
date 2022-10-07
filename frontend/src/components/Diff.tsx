import React from "react";
import "./Dashboard.scss";
import axios from "axios";
import { SummaryData } from "../types/SummaryData";
import Select, { SingleValue } from "react-select";
import "./Diff.scss";
import Dashboard from "./Dashboard";
import DashboardItem from "./DashboardItem";

type Option = {
  value: string;
  label: string;
};

const Diff = () => {
  const [sensors, setSensors] = React.useState<SummaryData[]>([]);
  const [sensorId, setSensorId] = React.useState<string | null>(null);
  const [diff, setDiff] = React.useState<number | null>(null);

  const getSummary = React.useCallback(async () => {
    const response = await axios.get("http://localhost:3001/summary");
    if (response?.data?.datas?.length > 0) {
      setSensors(response.data.datas);
      setSensorId(response.data.datas[0].id);
    }
  }, [setSensors]);

  React.useEffect(() => {
    getSummary();
  }, [getSummary]);

  const getDiff = React.useCallback(
    async (sensorId: string) => {
      const response = await axios.get(
        `http://localhost:3001/diff/${sensorId}`
      );
      if (response.data) {
        setDiff(response.data.differenceInCelsius);
      }
    },
    [setDiff]
  );

  React.useEffect(() => {
    if (sensorId) {
      setDiff(null);
      getDiff(sensorId);
    }
  }, [getDiff, sensorId]);

  const options: Option[] = sensors.map((sensor: SummaryData) => {
    return { value: sensor.id, label: sensor.id };
  });

  return (
    <div className="diff">
      <div className="diff__select-wrap">
        <h2>Select sensor</h2>
        <Select
          className="select"
          classNamePrefix="select"
          options={options}
          onChange={(newValue: SingleValue<Option>) =>
            setSensorId(newValue?.value ?? null)
          }
          defaultValue={{ value: sensorId ?? "", label: sensorId ?? "" }}
          value={{ value: sensorId ?? "", label: sensorId ?? "" }}
        />
      </div>
      <Dashboard fullWidth={true}>
        {sensorId && diff ? (
          <DashboardItem
            title={sensorId}
            temperature={Math.round(diff)}
            description="Temperature difference"
          />
        ) : (
          <h3 className="dashboard__fetch-status">Fetching...</h3>
        )}
      </Dashboard>
    </div>
  );
};

export default Diff;
