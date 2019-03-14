let edges = [
  ['14th&6th', '23rd&6th'],
  ['23rd&6th', '34th&6th'],
  ['34th&6th', '28th&Bwy'],
  ['28th&Bwy', '23rd&Bwy'],
  ['23rd&Bwy', '14th&Lex'],
  ['14th&Lex', '23rd&Lex']
]

let vertices = [
  {name: '34th&6th', distance: null, predecessor: null},
  {name: '23rd&6th', distance: null, predecessor: null},
  {name: '28th&Bwy', distance: null, predecessor: null},
  {name: '14th&6th', distance: null, predecessor: null},
  {name: '23rd&Bwy', distance: null, predecessor: null},
  {name: '14th&Lex', distance: null, predecessor: null},
  {name: '23rd&Lex', distance: null, predecessor: null}
]

let rootNode = vertices[0]

// function findAdjacent(nodeName, vertices, edges){
//   let nodeEdges = edges.filter(edge => edge.includes(nodeName))
//   let newArray = [].concat(...nodeEdges)
//   let adjacentNodes = vertices.filter(vertex => newArray.includes(vertex.name) && vertex.name !== nodeName)
//   console.log(adjacentNodes)
//   return adjacentNodes;
// }

function findAdjacent(nodeName, vertices, edges){
  return edges.filter(function(edge){
    return edge.includes(nodeName)
  }).map(function(edge){
    return edge.filter(function(node){
      return (node != nodeName)
    })[0]
  }).map(function(name){
    return findNode(name, vertices)
  }).filter(function(node){
    return node.distance == null;
  })
}

function findNode(nodeName, vertices){
  return vertices.find(function(vertex){
    return vertex.name == nodeName
  })
}

// function markDistanceAndPredecessor(node, adjacentNodes){
//   let nodes = adjacentNodes.map(adjacentNode => {
//     adjacentNode.predecessor = node;
//     adjacentNode.distance = node.distance + 1;
//   })
//   return nodes
// }

function markDistanceAndPredecessor(predecessor, adjacentNodes){
  adjacentNodes.map(function(node){
    node.distance = predecessor.distance + 1;
    node.predecessor = predecessor;
  })
}

// function bfs(startingNode, vertices, edges){
//   startingNode.distance = 0
//   let queue = []
//   queue.push(startingNode)
//   let nodeOrder = []
//   nodeOrder.push(startingNode)
//   while(!queue.length == 0) {
//     let firstNode = queue.shift()
//     console.log('first node', firstNode)
//     let adjacentVertices = findAdjacent(firstNode.name, vertices, edges)
//     adjacentVertices.forEach(vertex => {
//       console.log(vertex)
//       queue.push(vertex)
//       nodeOrder.push(vertex)
//       markDistanceAndPredecessor(vertex, adjacentVertices)
//     }
//   }
//   return nodeOrder
// }

function bfs(startingNode, vertices, edges){
  startingNode.distance = 0
  let discovered = [startingNode]
  let discoverOrder = [startingNode]
  while(discovered.length != 0){
    let currentNode = discovered.shift()
    let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
    discoverOrder = discoverOrder.concat(adjacentNodes);
    markDistanceAndPredecessor(currentNode, adjacentNodes)
    discovered = discovered.concat(adjacentNodes)
  }
  return discoverOrder
}
