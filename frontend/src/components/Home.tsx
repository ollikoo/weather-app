import React from "react";
import "./Home.scss";
import "./Dashboard.scss";
import axios from "axios";
import { SummaryData } from "../types/SummaryData";
import Dashboard from "./Dashboard";
import DashboardItem from "./DashboardItem";

const Home = () => {
  const [datas, setDatas] = React.useState<SummaryData[]>([]);
  const [count, setCount] = React.useState<number>(10);

  const getSummary = React.useCallback(async () => {
    const response = await axios.get("http://localhost:3001/summary");
    if (response.data) {
      setDatas(response.data.datas);
      setCount(10);
    }
  }, [setDatas, setCount]);

  React.useEffect(() => {
    getSummary();

    const fetchInterval = setInterval(() => {
      getSummary();
    }, 10000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, [getSummary]);

  React.useEffect(() => {
    const countInterval = setInterval(() => {
      setCount((prev: number) => {
        if (prev > 0) {
          return prev - 1;
        } else return 10;
      });
    }, 1000);

    return () => {
      clearInterval(countInterval);
    };
  }, [datas]);

  return (
    <div className="home">
      <h2>Sensor data</h2>
      <Dashboard>
        <>
          {datas?.length > 0 ? (
            datas.map((data: SummaryData) => {
              return (
                <DashboardItem
                  key={data.id}
                  title={data.id}
                  temperature={Math.round(data.avgTemp)}
                  description="Avg. temperature"
                  bottomTitle={`Data count: ${data.count}`}
                  showIcon={true}
                />
              );
            })
          ) : (
            <h3 className="dashboard__fetch-status">No data</h3>
          )}
          <p className="dashboard__fetch-status">Fetching in {count} seconds</p>
        </>
      </Dashboard>
    </div>
  );
};

export default Home;
