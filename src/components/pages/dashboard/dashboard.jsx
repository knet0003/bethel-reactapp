import React from "react";
import "./dashboard.css";
import Charts from "../../../charts/charts";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="cards">
        <div className="cardContainer">
          <Charts title="Node CPU Usage" buttonText="this month" />
        </div>
        <div className="cardContainer">
          <Charts title="Node Memory Usage" buttonText="this month" />
        </div>
      </div>
      <div className="cards">
        <div className="cardContainer">
          <h2>System Log</h2>
          Node deployed...
        </div>
        <div className="cardContainer">
          <h2>Network Status</h2>

          <div className="statusContainer">
            <span className="statusTitle">Proof of value</span>
            <input type="radio" className="status" />
          </div>

          <div className="statusContainer">
            <span className="statusTitle">Proof of Distribution</span>
            <input type="radio" className="status" />
          </div>

          <div className="statusContainer">
            <span className="statusTitle">Main Network</span>
            <input type="radio" className="status" />
          </div>

          <div className="statusContainer">
            <span className="statusTitle">Bethel core</span>
            <input type="radio" className="status" />
          </div>
        </div>
      </div>
    </div>
  );
}
