import React from "react";
import "./dashboard.css";
import Charts from "../../../charts/charts";
import { getSystemLog, getNetworkStatus } from "../../../services/authService";

class Dashboard extends React.Component {
  state = {
    log: "",
    status: "",
  };

  async componentDidMount() {
    const { data } = await getSystemLog();
    const { response } = data;
    const { message } = response;
    if (message.trim() === "Successs") {
      // const {
      //   account_created,
      //   projects_created,
      //   projects_deleted,
      //   droplets_created,
      //   droplets_deleted,S
      //   droplets_deployed,
      // } = data;
      this.setState({ log: data });
    }
    console.log(response);

    const { data: data2 } = await getNetworkStatus();
    const { response: response2 } = data2;
    console.log(data2, response2);
    const { status } = response2;
    if (status === true) {
      this.setState({ status: data2 });
    }
  }

  showLog = () => {
    const logi = this.state.log;

    for (const property in logi) {
      console.log(`${property}: ${logi[property]}`);
    }
  };

  render() {
    const status = this.state.status;
    const { pov, pod, mainnetwork, bethelcore } = status;
    const {
      account_created,
      projects_created,
      projects_deleted,
      droplets_created,
      droplets_deleted,
      droplets_deployed,
    } = this.state.log;

    return (
      <div className="dashboard">
        <div className="dashboardcards">
          <div className="dashboardcardContainer">
            <Charts title="Node CPU Usage" buttonText="this month" />
          </div>
          <div className="dashboardcardContainer">
            <Charts title="Node Memory Usage" buttonText="this month" />
          </div>
        </div>
        <div className="dashboardcards">
          <div className="dashboardcardContainer">
            <h2>System Log</h2>
            {/* <div>{JSON.stringify(this.state.log)}</div> */}
            <div>Account created: {account_created}</div>
            <div>{this.showLog}</div>
          </div>
          <div className="dashboardcardContainer">
            <h2>Network Status</h2>
            <div>{JSON.stringify(this.state.status)}</div>

            <div className="statusContainer">
              <span className="statusTitle">Proof of value</span>
              <input type="radio" className="status" checked={pov} />
            </div>

            <div className="statusContainer">
              <span className="statusTitle">Proof of Distribution</span>
              <input type="radio" className="status" checked={pod} />
            </div>

            <div className="statusContainer">
              <span className="statusTitle">Main Network</span>
              <input type="radio" className="status" checked={mainnetwork} />
            </div>

            <div className="statusContainer">
              <span className="statusTitle">Bethel core</span>
              <input type="radio" className="status" checked={bethelcore} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
