import Node from "./entity/node.js";
import Connection from "./entity/connection.js";

export default class World {
    constructor(nodes) {
        this.nodes = nodes || [];
    }
    
    addNode(node) {
        this.nodes.push(node);
    }
}

export function demoWorld(xCenter, yCenter) {
    const world = new World();
    world.addNode(new Node(
        xCenter - 150,
        yCenter + 75,
        50,
        50
    ))
    world.addNode(new Node(
        xCenter + 150,
        yCenter - 75,
        50,
        50
    ))
    const conn1 = new Connection(
        world.nodes[0],
        world.nodes[1]
    )
    world.nodes[0].connections.push(conn1)
    world.nodes[1].connections.push(conn1)
    const conn2 = new Connection(
        world.nodes[0],
        world.nodes[1]
    )
    world.nodes[0].connections.push(conn2)
    world.nodes[1].connections.push(conn2)
    return world;
}