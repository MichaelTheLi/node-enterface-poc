import Node from "./entity/node.js";
import Connection from "./entity/connection.js";

export default class Pipeline {
    constructor(nodes) {
        this.nodes = nodes || [];
    }
    
    addNode(node) {
        this.nodes.push(node);
    }
}

export function demoPipeline(xCenter, yCenter) {
    const pipeline = new Pipeline();
    pipeline.addNode(new Node(
        xCenter - 150,
        yCenter + 75,
        50,
        50
    ))
    pipeline.addNode(new Node(
        xCenter + 150,
        yCenter - 75,
        50,
        50
    ))
    const conn1 = new Connection(
        pipeline.nodes[0],
        pipeline.nodes[1]
    )
    pipeline.nodes[0].connections.push(conn1)
    pipeline.nodes[1].connections.push(conn1)
    const conn2 = new Connection(
        pipeline.nodes[0],
        pipeline.nodes[1]
    )
    pipeline.nodes[0].connections.push(conn2)
    pipeline.nodes[1].connections.push(conn2)
    return pipeline;
}