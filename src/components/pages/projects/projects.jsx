import React from "react";
import "./projects.css";
import ProjectTable from "./projectsTable";
import NodeTable from "./nodeTable";
import { getNodes } from "../../../services/fakeNodeService";
import "../../../charts/charts.css";
import Dropdown from "@restart/ui/esm/Dropdown";
import { DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Projects extends React.Component {
  state = {
    projects: [],
    nodes: [],
  };

  async componentDidMount() {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA3NDkzODcsImlzcyI6IjYxYjk3YWQzNDMxN2FiMDM0MmFiOTQ1ZCJ9.Q7kwxYE2-UWf6MsGumdHGFL1ZNzuEQH94-Oz3EGv6Qs";
    axios
      .get(
        "http://20.211.122.248:8000/api/v1/project/61b97ad34317ab0342ab945d",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // this.setState({ projects: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
    // const authAxios = axios.create({
    //   baseURL:
    //     "http://20.211.122.248:8000/api/v1/project/61b97ad34317ab0342ab945d",
    //   headers: {
    //     Authorization:
    //       "Bearer" +
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzk3MTg1NTUsImlzcyI6IjYxYjk3YWQzNDMxN2FiMDM0MmFiOTQ1ZCJ9.rPfKPpu0tulahhDw4J2nFmjGLYV7q9lVHlVdhQKlU1Q",
    //   },
    // });
    // const { data } = await getProjects();
    // this.setState({ projects: data });
    // this.setState({ projects: getProjects() });
    this.setState({ nodes: getNodes() });
  }

  render() {
    return (
      <div className="projects">
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Projects</h2>
              <Link to="/projects/new" className="button-outlined">
                Create new
              </Link>
            </div>
            <ProjectTable projects={this.state.projects} />
          </div>
        </div>
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2 className="chartTitle">Deployed Nodes</h2>
              <Link to="/createnode" className="button-outlined">
                Create new
              </Link>
            </div>
            <NodeTable nodes={this.state.nodes} />
          </div>
        </div>
        <div className="cards">
          <div className="cardContainer">
            <div className="chartTop">
              <h2>Add Nodes</h2>
            </div>
            <div className="chartTop">
              <DropdownButton title="Select node" className="drop">
                {this.state.nodes.map((node, index) => {
                  return <Dropdown.Item key={index}>{node.name}</Dropdown.Item>;
                })}
              </DropdownButton>
              <DropdownButton
                id="dropdown-variants-Secondary"
                title="Select project"
              >
                {this.state.projects.map((project, index) => {
                  return (
                    <Dropdown.Item key={index}>{project.name}</Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <button className="button-primary">Deploy</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
