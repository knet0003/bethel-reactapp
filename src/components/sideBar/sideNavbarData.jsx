import Dashboard from "../pages/dashboard/dashboard";
import Projects from "../pages/projects/projects";
import Status from "../pages/status/status";
import Support from "../pages/Support/support";

import {
  Home,
  AutoAwesomeMotion,
  Assessment,
  SupportAgent,
  Backup,
} from "@mui/icons-material";
import Deployment from "../pages/deployment/deployment";

export const routes = [
  {
    title: "Dashboard",
    path: "/",
    sidebar: () => <div>home!</div>,
    main: () => <Dashboard />,
    cName: "nav-text",
    icon: <Home />,
  },
  {
    title: "Projects",
    path: "/projects",
    sidebar: () => <div>Projects!!</div>,
    main: () => <Projects />,
    cName: "nav-text",
    icon: <AutoAwesomeMotion />,
  },
  {
    title: "Status",
    path: "/status",
    sidebar: () => <div>status!</div>,
    main: () => <Status />,
    cName: "nav-text",
    icon: <Assessment />,
  },
  {
    title: "Deployment",
    path: "/deployment",
    sidebar: () => <div>deploy!</div>,
    main: () => <Deployment />,
    cName: "nav-text",
    icon: <Backup />,
  },
  {
    title: "Support",
    path: "/support",
    sidebar: () => <div>support!</div>,
    main: () => <Support />,
    cName: "nav-text",
    icon: <SupportAgent />,
  },
];
