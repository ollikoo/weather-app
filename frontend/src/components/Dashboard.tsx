import React from "react";
import "./Dashboard.scss";

type DashboardProps = {
  children?: JSX.Element;
  fullWidth?: boolean;
};

const Dashboard = ({ children, fullWidth }: DashboardProps) => {
  return (
    <div className={`dashboard ${fullWidth ? "dashboard--full-width" : ""}`}>
      {children}
    </div>
  );
};

export default Dashboard;
