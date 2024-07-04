import Node from "./entity/node.js";
import UINode from "./uiEntity/node.js";
import UIConnection from "./uiEntity/connection.js";

export function demoPipeline(pipeline) {
    const node1 = new Node('#1')
    const node2 = new Node('#2')
    pipeline.addNode(node1)
    pipeline.addNode(node2)
    node1.output.push(node2);
    node1.output.push(node2);
    node2.input.push(node1)
    node2.input.push(node1)
    // TODO Is it ok to have both sides, input and output?
}

export function demoPipelineScene(scene, xCenter, yCenter) {
    const node1 = new UINode(
        scene.pipeline.getNode('#1'),
        xCenter - 150,
        yCenter + 75,
        50,
        50
    )
    const node2 = new UINode(
        scene.pipeline.getNode('#2'),
        xCenter + 150,
        yCenter - 75,
        50,
        50
    )

    scene.elements.push(node1);
    scene.elements.push(node2);

    scene.elements.push(new UIConnection(node1, node2))
    // TODO Should be unique, now fromIndex and toIndex are messed up
    scene.elements.push(new UIConnection(node1, node2))
}