/* 
GOTCHAS/ Learning points
1. 
When you merge a node, you have to replace all references to that node.
Replace, not remove. 
Because the node still exists, just within a bigger "supernode" with and taking on the "supernode's ID".

2. 
In like vein, you can't filter out duplicates when you join 
the Adjacent Edge lists of 2 nodes. 
Because every duplicate value actually represents a different original node, 
Just that they are representing different subsets of this supernode,
which is represented by a single ID value.
Hence no need for new Set() etc. makes things simpler.


3. Silly mistakes 
- graphCopy[source] = graphCopy[source].filter((v) => v === source);
// this actually removes all nodes except self...
*/

export const kargerMincut = (graph: Record<string, string[]>): number => {
  // clone the graph
  const graphCopy: Record<string, string[]> = JSON.parse(JSON.stringify(graph));

  while (Object.keys(graphCopy).length > 2) {
    const { source, destination } = selectEdge(graphCopy);
    // console.log("Source", source);
    // console.log("destination", destination);

    contractGraph(graphCopy, source, destination);
  }

  // either of the supervertices will should yield the same edge count
  // as they are essentially connected
  const firstSuperVertexId = Object.keys(graphCopy)[0];

  return graphCopy[firstSuperVertexId].length;
};

function contractGraph(graph: Record<string, string[]>, source: string, target: string) {
  const soucePointers = graph[source];
  const targetPointers = graph[target];

  graph[source] = [...soucePointers, ...targetPointers];
  for (const t of targetPointers) {
    graph[t] = graph[t].map((p) => (p === target ? source : p));
  }

  // remove self loops, i.e. edges pointing to self,
  // as they cannot be a cut since these edges will not "cross the frontier"
  // i.e. they will not be joining the final two super vertices
  graph[source] = graph[source].filter((v) => v !== source);

  delete graph[target];
}

function selectEdge(graphCopy: Record<string, string[]>) {
  function chooseRandom<T>(arr: T[]): T {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }
  const source = chooseRandom(Object.keys(graphCopy));
  const possibleDestinations = graphCopy[source];
  const destination = chooseRandom(possibleDestinations);
  return { source, destination };
}
