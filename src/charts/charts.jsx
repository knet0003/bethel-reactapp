import Example from "./chartData";
import "./charts.css";

const Charts = ({ title, buttonText }) => {
  return (
    <span className="chart">
      <div className="chartTop">
        <h2 className="chartTitle">{title}</h2>
        <button className="button-outlined">{buttonText}</button>
      </div>
      <Example />
    </span>
  );
};

export default Charts;
