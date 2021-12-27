const nodes = [
    {
      _id: "ehtj5rhtyj1",
      name: "Node 1",
      image: "Image1",
      volume: 6,
      projectName: "Dixons",
      createDate: "2018-01-03T19:04:28.809Z"
    },
    {
      _id: "ehtj5rhtyj2",
      name: "Node 2",
      image: "Image2",
      volume: 5,
      projectName: "Motels",
      createDate: "2018-01-03T19:04:28.809Z"
    },
    {
      _id: "ehtj5rhtyj3",
      name: "Node 3",
      image: "Image3",
      volume: 8,
      projectName: "Zipcar",
      createDate: "2018-01-03T19:04:28.809Z"
    }
  ];
  
  export function getNodes() {
    return nodes;
  }
  
  export function getNode(id) {
    return nodes.find(m => m._id === id);
  }
  
  export function saveNode(node) {
    let nodeInDB = nodes.find(m => m._id === node._id) || {};
    nodeInDB.name = node.name;
    nodeInDB.projectName = node.projectName;
    nodeInDB.image = node.image;
    nodeInDB.volume = node.volume;
    nodeInDB.createDate = node.createDate;
  
    if (!nodeInDB._id) {
      nodeInDB._id = Date.now();
   nodes.push(nodeInDB);
    }
  
    return nodeInDB;
  }
  
  export function deleteNode(id) {
    let nodeInDB = nodes.find(m => m._id === id);
   nodes.splice(nodes.indexOf(nodeInDB), 1);
    return nodeInDB;
  }
  