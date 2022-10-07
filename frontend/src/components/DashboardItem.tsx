import React from "react";
import Icon from "./Icon";

type DashboardItemProps = {
  title?: string;
  temperature?: number;
  description?: string;
  bottomTitle?: string;
  showIcon?: boolean;
};

const DashboardItem = ({
  title,
  temperature,
  description,
  bottomTitle,
  showIcon,
}: DashboardItemProps) => {
  const renderIcon = (avgTemp: number) => {
    if (avgTemp >= 25) {
      return (
        <div className="dashboard__item-status dashboard__item-status--best">
          <Icon name="bx bx-cool" size="xlarge" color="best" />
        </div>
      );
    } else if (avgTemp >= 20) {
      return (
        <div className="dashboard__item-status dashboard__item-status--good">
          <Icon name="bx bx-smile" size="xlarge" color="good" />
        </div>
      );
    } else if (avgTemp >= 10) {
      return (
        <div className="dashboard__item-status dashboard__item-status--ok">
          <Icon name="bx bx-meh" size="xlarge" color="ok" />
        </div>
      );
    } else if (avgTemp >= 0) {
      return (
        <div className="dashboard__item-status dashboard__item-status--bad">
          <Icon name="bx bx-confused" size="xlarge" color="bad" />
        </div>
      );
    } else if (avgTemp < 0) {
      return (
        <div className="dashboard__item-status dashboard__item-status--worst">
          <Icon name="bx bx-angry" size="xlarge" color="worst" />
        </div>
      );
    }
  };

  return (
    <div className="dashboard__item">
      {title && (
        <div className="dashboard__item-row">
          <div className="dashboard__item-row-left">
            <Icon name="bx bx-map" size="medium" />
            <h3>{title}</h3>
          </div>
        </div>
      )}
      <div className="dashboard__item-row">
        <div className="dashboard__item-row-left">
          <div className="dashboard__item-data">
            {temperature && <h1>{temperature} °C</h1>}
            {description && <h4>{description}</h4>}
          </div>
        </div>
        {temperature && showIcon && (
          <div className="dashboard__item-row-right">
            {renderIcon(temperature)}
          </div>
        )}
      </div>
      {bottomTitle && (
        <div className="dashboard__item-row">
          <p>{bottomTitle}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardItem;
