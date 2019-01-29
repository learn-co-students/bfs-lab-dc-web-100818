function bfs(rootNode, vertices, edges){
  rootNode.distance = 0
  let queue = [rootNode]
  let order = [rootNode]

  while(queue.length !== 0){
    let current = queue.shift()
    let adjacents = findAdjacent(current.name, vertices, edges)
    markDistanceAndPredecessor(current, adjacents)
    order = order.concat(adjacents)
    queue = queue.concat(adjacents)
  }
  return order
}

function findAdjacent(node, vertices, edges){
  let adjEdges = edges.filter( edge => edge.includes(node) ).flat()
  let adjVertices = adjEdges.filter( edge => edge !== node )
  let adjacent = vertices.filter( vertex => {
    return adjVertices.includes(vertex.name)
  })
  return adjacent.filter( vertex => {
    return vertex.distance === null
  })
}

function markDistanceAndPredecessor(start, adjacents){
  return adjacents.map( adj => {
    adj.distance = start.distance + 1
    adj.predecessor = start
  })
}
