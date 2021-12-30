const projects = [
  {
    project_id: "5b21ca3eeb7f6fbccd471815",
    name: "Dixons",
    provider: "azure",
    nodes_count: 6,
    owner_id: "Sarah",
    created_at: "2018-01-03T19:04:28.809Z",
    deployed: true,
    switch: true
  },
  {
    project_id: "5b21ca3eeb7f6fbccd471816",
    name: "Motels",
    provider: "do",
    nodes_count: 5,
    owner_id: "Anna",
    created_at: "2018-01-03T19:04:28.809Z",
    deployed: true,
    switch: true
  },
  {
    project_id: "5b21ca3eeb7f6fbccd471817",
    name: "ZipCar",
    provider: "azure",
    nodes_count: 8,
    owner_id: "Brody",
    created_at: "2018-01-03T19:04:28.809Z",
    deployed:false,
    switch: false
  }
];

export function deployProject(id) {
  // let projectInDb = projects.find(m => m._id === id);
  // if (projectInDb.deployed) projectInDb.deployed == true 
  // else projectInDb.deployed == false;
}

export function getProjects() {
  return projects;
}

export function getProject(id) {
  return projects.find(m => m._id === id);
}

export function saveProject(project) {
  let projectInDb = projects.find(m => m._id === project._id) || {};
  projectInDb.name = project.name;
  projectInDb.owner = project.owner;
  projectInDb.environment = project.environment;
  projectInDb.nodeCount = project.nodeCount;
  projectInDb.createDate = project.createDate;

  if (!projectInDb._id) {
    projectInDb._id = Date.now();
 projects.push(projectInDb);
  }

  return projectInDb;
}

export function deleteProject(id) {
  let projectInDb = projects.find(m => m.project_id === id);
 projects.splice(projects.indexOf(projectInDb), 1);
  return projectInDb;
}
